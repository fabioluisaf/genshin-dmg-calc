import fs from 'fs';

async function readFromFile(filePath) {
  const str = await fs.promises.readFile(`./${filePath}`, 'utf-8');
  return str;
}

async function writeToFile(filePath, dataStr) {
  fs.writeFile(`./${filePath}`, dataStr, err => {
    if (err) {
      console.error(err);
    } else {
      console.log('File written successfully');
    }
  });
}

export { readFromFile, writeToFile };