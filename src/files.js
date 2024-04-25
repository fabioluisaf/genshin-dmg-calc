import fs from 'fs';

async function readFromFile(fileName) {
  const charStr = await fs.promises.readFile(`./src/demo/${fileName}.json`, 'utf-8');
  return JSON.parse(charStr);
}

async function writeToFile(fileName, json) {
  fs.writeFile(`./src/demo/${fileName}.json`, JSON.stringify(json), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully');
    }
  });
}

export { readFromFile, writeToFile };