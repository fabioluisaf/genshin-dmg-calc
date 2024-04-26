import wgs from "./demo/demoWeapon.js";
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
import equipArtifactSet from "./character/equipArtifactSet.js";
import { getArtifactSetData, getCharData, getFullCharData, getWeaponData } from "./consume-ambr/dataFromApi.js";

const charAmbrData = await readFromFile('gaming');
const baseChar = createCharFromAmbr(charAmbrData);
const charBaseTalents = createTalentsFromAmbr(charAmbrData);
const baseWeapon = await readFromFile('wgs');

const leveledChar = buildLeveldChar(baseChar, 80);

const chosenWeaponBuff = Object.keys(wgs.passives)[0];

equipWeapon(leveledChar, wgs, 1, chosenWeaponBuff);
equipArtifactSet(leveledChar, marechaussee, "4pcs (3 stacks)");
addToBuffList(leveledChar, "plunging attack: charmed cloudstrider", 0.2); // Talent: Air of Prosperity

const charAfterBuffs = applyBuffList(leveledChar);
const leveledTalents = talentsAtLevels(charBaseTalents, 9, 9, 9);

const dmg = calculateTalentDmg(charAfterBuffs, {}, leveledTalents.elementalSkill, []);

// console.log(charAfterBuffs);
// console.log(dmg);

console.log(baseWeapon);