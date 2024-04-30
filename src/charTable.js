import buildLeveledChar from "./character/buildLeveledChar.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import { getCharData } from "./consume-ambr/dataFromApi.js";
import createCharCsv from "./csv-create/charCsvEntry.js";
import { writeToFile } from "./files.js";

const allChars = await getCharData();
let csvStr = '';

csvStr += 'Name,';
csvStr += 'Rarity,';
csvStr += 'Element,';
csvStr += 'Base HP,';
csvStr += 'Base ATK,';
csvStr += 'Base DEF,';
csvStr += 'EM,';
csvStr += 'CRIT RATE,';
csvStr += 'CRIT DMG,';
csvStr += 'ER,';
csvStr += 'Electro DMG Bonus,';
csvStr += 'Geo DMG Bonus,';
csvStr += 'Pyro DMG Bonus,';
csvStr += 'Hydro DMG Bonus,';
csvStr += 'Cryo DMG Bonus,';
csvStr += 'Anemo DMG Bonus,';
csvStr += 'Dendro DMG Bonus,';
csvStr += 'ATK%,'
csvStr += 'DEF%,'
csvStr += 'HP%,'
csvStr += 'Healing Bonus\n'

for (let char of allChars) {
  const charAmbrData = await getCharData(char.name);
  const baseChar = createCharFromAmbr(charAmbrData);

  const charAt80 = buildLeveledChar(baseChar, 80);
  const charAt90 = buildLeveledChar(baseChar, 90);

  csvStr += createCharCsv(charAt80);
  csvStr += '\n';
  csvStr += createCharCsv(charAt90);
  csvStr += '\n';
  
  console.log(char.name);
}

await writeToFile('char-data', csvStr, 'csv');