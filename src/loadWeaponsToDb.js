import fixWeapons from "./csv-consume/weaponFixes.js";
import createWeaponFromCsv from "./csv-consume/weaponFromCsv.js";
import { CSV_DICT } from "./csv-consume/weaponKeysDict.js";
import { client } from "./db/dbConnect.js";
import { dbAddWeapon, dbDeleteWeapon, dbFindWeapon, dbGetAllWeapons } from "./db/weaponsDb.js";
import { readFromFile } from "./utils/files.js";

const csvData = await readFromFile('weapon.csv');
const [header, ...weapons] = csvData.split('\n').map(line => line.replace('\r', ''));

const fixedHeader = header.split(',').map(col => {
  if (CSV_DICT[col]) {
    return CSV_DICT[col];
  }

  return col;
});

const parsedWeapons = weapons.map(weaponCsv => createWeaponFromCsv(weaponCsv, fixedHeader));

const NEED_FIXING = [
  'Makhaira Aquamarine R1',
  'Redhorn Stonethresher R1',
  'Cinnabar Spindle R5',
  'Xiphos\' Moonlight R1',
  'Skyward Blade R1',
  'Primordial Jade Cutter R1',
  'Key of Khaj-Nisut R1 (3 stacks)',
  'Light of Foliar Incision R1 (Passive Up)',
  'Halberd R5 (Passive only once/10s)',
  'Crescent Pike R1 (Passive Up)',
  'Staff of Homa R1 (>50% HP)',
  'Staff of Homa R1 (<50% HP)',
  'Engulfing Lightning R1',
  'Staff of the Scarlet Sands R1 (3 stacks)',
  'Hunter\'s Path R1',
  'Wandering Evenstar R1',
  'Everlasting Moonglow R1',
];

const indexes = parsedWeapons
                .filter(w => NEED_FIXING.includes(w.name))
                .map(w => parsedWeapons.indexOf(w));

fixWeapons(parsedWeapons, indexes);

indexes.forEach(i => {
  const w = parsedWeapons[i];
  const variableStats = Object.keys(w.variableStats);

  variableStats.forEach(s => {
    if (w.variableStats[s] === undefined) {
      delete w.variableStats[s];
    }
  });
});

for(let w of parsedWeapons) {
  await dbAddWeapon(w);
}

console.log('finished adding');
await client.close();