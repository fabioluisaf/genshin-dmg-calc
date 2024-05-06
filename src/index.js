import buildLeveledChar from "./character/buildLeveledChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import talentsAtLevels from "./character/leveling/talentsAtLevels.js";
import calculateTalentDmg from "./calculateDmg.js";
import addBuff from "./character/buffs/addBuff.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import createTalentsFromAmbr from "./consume-ambr/talents/createTalentsFromAmbr.js";
import { readFromFile, writeToFile } from './utils/files.js'
import { getCharData, getFullCharData, getFullWeaponData, getWeaponData } from "./consume-ambr/dataFromApi.js";
import createWeaponFromAmbr from "./consume-ambr/createWeaponFromAmbr.js";
import { dbAllWeaponsOfType, dbFindWeapon } from "./db/weaponsDb.js";
import { client } from "./db/dbConnect.js";

const RUIN_GUARD = {
  name: "Ruin Guard",
  level: 87,
  pctDmgReduction: {},
  resistances: {
    physical: 0.7,
    pyro: 0.1,
    dendro: 0.1,
    hydro: 0.1,
    electro: 0.1,
    anemo: 0.1,
    cryo: 0.1,
    geo: 0.1,
  },
};

const charAmbrData = await getCharData('raiden shogun');
const weapon = await dbFindWeapon('Engulfing Lightning');

const baseChar = createCharFromAmbr(charAmbrData);
const charBaseTalents = createTalentsFromAmbr(charAmbrData);

const leveledTalents = talentsAtLevels(charBaseTalents, 9, 9, 9);
const leveledChar = buildLeveledChar(baseChar, 80);

const charWithWeapon = equipWeapon(leveledChar, weapon, 1);

// add variable weapon buffs after all other buffs

// const dmgBA = calculateTalentDmg(charAfterBuffs, leveledTalents['basic attack']);
// const dmgE = calculateTalentDmg(charWithWeapon, leveledTalents['elemental skill'], '', RUIN_GUARD);
// const dmgQ = calculateTalentDmg(charAfterBuffs, leveledTalents['elemental burst']);

// console.log(dmgE);
console.log(charWithWeapon);

await client.close();