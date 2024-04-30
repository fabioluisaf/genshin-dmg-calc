import createWeaponFromAmbr from "./consume-ambr/createWeaponFromAmbr.js";
import { getWeaponData } from "./consume-ambr/dataFromApi.js";
import getWeaponsOfType from "./csv-create/getWeaponsOfType.js";
import createWeaponCsv from "./csv-create/weaponCsvEntry.js";
import { writeToFile } from "./files.js";

const type = 'catalyst';
const weaponNames = await getWeaponsOfType(type);

let csvStr = 'Name, Rarity, Base ATK, EM, CRIT RATE, CRIT DMG, ER, Electro DMG Bonus, Geo DMG Bonus, Pyro DMG Bonus, Hydro DMG Bonus, Cryo DMG Bonus, Anemo DMG Bonus, Dendro DMG Bonus, Physical DMG Bonus, ATK%, DEF%, HP%, Healing Bonus\n';

for(let weapon of weaponNames) {
  const weaponAmbrData = await getWeaponData(weapon.name);
  const baseWeapon = createWeaponFromAmbr(weaponAmbrData);

  csvStr += createWeaponCsv(baseWeapon) + '\n';

  console.log(weapon.name);
}

await writeToFile(type, csvStr, 'csv');