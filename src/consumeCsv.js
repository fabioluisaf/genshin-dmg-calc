import { readFromFile } from "./utils/files.js";

const csvData = await readFromFile('weapon.csv');
const header = csvData.split('\n')[0];

console.log(header);