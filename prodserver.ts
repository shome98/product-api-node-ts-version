import http, { IncomingMessage, ServerResponse } from "http";
import { EventEmitter } from "events";
import fs from "fs";
import { parse } from "url";

const eventEmitter = new EventEmitter();
const DATA_FILE = "data.json";

// Define an interface for the data item
interface DataItem {
  id: number;
  [key: string]: any;
}

// Helper function to check if the data file exists or not
const ensureDataFileExists = async (): Promise<void> => {
  try {
    await fs.promises.access(DATA_FILE, fs.constants.F_OK);
  } catch (error) {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify([]));
  }
};

// Reads data from the file
const readDataFromFile = async (): Promise<DataItem[]> => {
  try {
    await ensureDataFileExists();
    const data = await fs.promises.readFile(DATA_FILE, "utf8");
    return JSON.parse(data) as DataItem[];
  } catch (error) {
    console.error("Error reading data file: ", error);
    return [];
  }
};

// Writes data to the file
const writeDataToFile = async (data: DataItem[]): Promise<void> => {
  try {
    await fs.promises.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing data file: ", error);
  }
};

//Helper function to get the request body
const getRequestBody = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => resolve(body));
    req.on("error", (err) => reject(err));
  });
};

// Event handling for save
eventEmitter.on("saveData", async (newData: DataItem) => {
  try {
    const data = await readDataFromFile();
    data.push(newData);
    await writeDataToFile(data);
  } catch (error) {
    console.error("Error saving data: ", error);
  }
});

// Event handling for update
eventEmitter.on("updateData", async (updatedData: DataItem) => {
  try {
    const data = await readDataFromFile();
    const index = data.findIndex((item) => item.id === updatedData.id);
    if (index !== -1) {
      data[index] = updatedData;
      await writeDataToFile(data);
    }
  } catch (error) {
    console.error("Error updating data: ", error);
  }
});

//Event handling for delete
eventEmitter.on("deleteData", async (id: number) => {
  try {
    let data = await readDataFromFile();
    data = data.filter((item) => item.id !== id);
    await writeDataToFile(data);
  } catch (error) {
    console.error("Error deleting data: ", error);
  }
});

// Create server and handle different routes
const server = http.createServer(
    async (req: IncomingMessage, res: ServerResponse) => { 
        try {
            
        } catch (error) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({message: "Internal server error",error: error.message,}));
        }
    })