import buildLeveledChar from "./character/buildLeveledChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import applyBuffList from "./character/buffs/applyBuffList.js";
import talentsAtLevels from "./character/leveling/talentsAtLevels.js";
import calculateTalentDmg from "./calculateDmg.js";
import addToBuffList from "./character/buffs/addToBuffList.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import createTalentsFromAmbr from "./consume-ambr/talents/createTalentsFromAmbr.js";
import { readFromFile, writeToFile } from './files.js'
import { getCharData, getFullCharData, getFullWeaponData, getWeaponData } from "./consume-ambr/dataFromApi.js";
import weaponAtRefinementLevel from "./weapon/weaponAtRefinementLevel.js";
import createWeaponFromAmbr from "./consume-ambr/createWeaponFromAmbr.js";
import fixWeapon from './manual-fixes/fixWeapon.js'

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

// (await getFullWeaponData()).data.items['15512'].type 
// get the weapon type from the full weapon data

const charAmbrData = await readFromFile('gaming');
const weaponAmbrData = await readFromFile('wgs');

const baseChar = createCharFromAmbr(charAmbrData);
const charBaseTalents = createTalentsFromAmbr(charAmbrData);
const weapon = createWeaponFromAmbr(weaponAmbrData);

fixWeapon(weapon);

const leveledTalents = talentsAtLevels(charBaseTalents, 9, 9, 9);
const leveledChar = buildLeveledChar(baseChar, 80);

equipWeapon(leveledChar, weapon, 1);
addToBuffList(leveledChar, 'critRate', 0.36); // Marechaussee
addToBuffList(leveledChar, "plunging attack: charmed cloudstrider", 0.2); // Talent: Air of Prosperity
addToBuffList(leveledChar, 'atkFlat', 820);
addToBuffList(leveledChar, 'critRate', 0.307);
addToBuffList(leveledChar, 'critDmg', 1.158);

const charAfterBuffs = applyBuffList(leveledChar);
const dmgBA = calculateTalentDmg(charAfterBuffs, leveledTalents['basic attack'], [], RUIN_GUARD);
const dmgE = calculateTalentDmg(charAfterBuffs, leveledTalents['elemental skill'], [], RUIN_GUARD);
const dmgQ = calculateTalentDmg(charAfterBuffs, leveledTalents['elemental burst'], [], RUIN_GUARD);

console.log(dmgE);
