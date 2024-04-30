import buildLeveledChar from "./character/buildLeveledChar.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import { getCharData } from "./consume-ambr/dataFromApi.js";
import createCharCsv from "./csv-create/charCsvEntry.js";
import { writeToFile } from "./files.js";

const allChars = await getCharData();

let csvStr = 'Name, Rarity, Element, Base HP, Base ATK, Base DEF, EM, CRIT RATE, CRIT DMG, ER, Electro DMG Bonus, Geo DMG Bonus, Pyro DMG Bonus, Hydro DMG Bonus, Cryo DMG Bonus, Anemo DMG Bonus, Dendro DMG Bonus, Physical DMG Bonus, ATK%, DEF%, HP%, Healing Bonus\n';

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