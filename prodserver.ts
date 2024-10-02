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