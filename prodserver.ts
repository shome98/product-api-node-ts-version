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