import fs from 'fs';

async function readFromFile(fileName) {
  const charStr = await fs.promises.readFile(`./src/demo/${fileName}.json`, 'utf-8');
  return JSON.parse(charStr);
}

async function writeToFile(fileName, dataStr, fileType) {
  fs.writeFile(`./out/${fileName}.${fileType}`, dataStr, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully');
    }
  });
}

export { readFromFile, writeToFile };