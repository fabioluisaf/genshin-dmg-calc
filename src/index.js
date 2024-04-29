import marechaussee from "./demo/demoArtifactSet.js";

import buildLeveldChar from "./character/buildLeveldChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import applyBuffList from "./character/buffs/applyBuffList.js";
import talentsAtLevels from "./character/leveling/talentsAtLevels.js";
import calculateTalentDmg from "./calculateDmg.js";
import addToBuffList from "./character/buffs/addToBuffList.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import createTalentsFromAmbr from "./consume-ambr/talents/createTalentsFromAmbr.js";
import { readFromFile, writeToFile } from './files.js'
import applyArtifactBuffs from "./equipArtifactSet.js";
import { getArtifactSetData, getCharData, getFullCharData, getFullWeaponData, getWeaponData } from "./consume-ambr/dataFromApi.js";
import weaponAtRefinementLevel from "./weapon/weaponAtRefinementLevel.js";
import createWeaponFromAmbr from "./consume-ambr/createWeaponFromAmbr.js";
import levelUpWeapon from "./weapon/levelUpWeapon.js";
import createSetFromAmbr from "./consume-ambr/createSetFromAmbr.js";

// (await getFullWeaponData()).data.items['15512'].type 
// get the weapon type from the full weapon data

const charAmbrData = await readFromFile('gaming');
const weaponAmbrData = await readFromFile('wgs');
const setAmbrData = await readFromFile('marechaussee');

const baseChar = createCharFromAmbr(charAmbrData);
const charBaseTalents = createTalentsFromAmbr(charAmbrData);
const baseWeapon = createWeaponFromAmbr(weaponAmbrData);
const artifactSet = createSetFromAmbr(setAmbrData);

const leveledTalents = talentsAtLevels(charBaseTalents, 9, 9, 9);
const leveledChar = buildLeveldChar(baseChar, 80);
const leveledWeapon = levelUpWeapon(baseWeapon);

// equipWeapon(leveledChar, leveledWeapon, 1);
// applyArtifactBuffs(leveledChar, marechaussee, "4pcs (3 stacks)", "2pcs");
// addToBuffList(leveledChar, "plunging attack: charmed cloudstrider", 0.2); // Talent: Air of Prosperity
// addToBuffList(leveledChar, 'atkFlat', 820);
// addToBuffList(leveledChar, 'critRate', 0.307);
// addToBuffList(leveledChar, 'critDmg', 1.158);

// const charAfterBuffs = applyBuffList(leveledChar);
// const dmg = calculateTalentDmg(charAfterBuffs, {}, leveledTalents.elementalSkill, []);

// console.log(dmg);

// console.log(artifactSet);