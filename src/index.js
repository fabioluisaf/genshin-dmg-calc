import { gamingBase, gamingBaseTalents, gamingPassiveTalents } from "./demo/demoChar.js";
import wgs from "./demo/demoWeapon.js";
import marechaussee from "./demo/demoArtifactSet.js";
import artifactPieces from "./demo/demoArtifactPieces.js";
import RUIN_GUARD from "./demo/demoTarget.js"

import buildLeveldChar from "./character/buildLeveldChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import { equipArtifacts } from "./artifact/equipArtifacts.js";
import { equipedSetsAmts } from "./artifact/artifactUtils.js";
import { getPossibleArtifactPassives } from "./artifact/artifactUtils.js";
import applyBuffList from "./character/buffs/applyBuffList.js";
import talentsAtLevels from "./character/leveling/talentsAtLevels.js";
import calculateTalentDmg from "./calculateDmg.js";
import addToBuffList from "./character/buffs/addToBuffList.js";
import fs from 'fs';
import consumeAmbrApi from "./consume-ambr/index.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import createTalentsFromAmbr from "./consume-ambr/createTalentsFromAmbr.js";
import { readFromFile, writeToFile } from './files.js'

// const leveledGaming = buildLeveldChar(gamingBase, 80);

// const equipedSets = equipedSetsAmts(artifactPieces);
// const equipedAmt = equipedSets[marechaussee.artifactSetName];

// const chosenWeaponBuff = Object.keys(wgs.passives)[0];
// const chosenArtifactBuff = getPossibleArtifactPassives(marechaussee, equipedAmt)[0];

// equipWeapon(leveledGaming, wgs, 1, chosenWeaponBuff);
// equipArtifacts(leveledGaming, artifactPieces, chosenArtifactBuff);
// addToBuffList(leveledGaming, "charmedCloudstrider", gamingPassiveTalents.a4.charmedCloudstrider);

// const gamingAfterBuffs = applyBuffList(leveledGaming);
// const leveledTalents = talentsAtLevels(gamingBaseTalents, 9, 9, 9);

// const dmg = calculateTalentDmg(gamingAfterBuffs, {}, leveledTalents.elementalSkill, []);

// console.log(gamingAfterBuffs);
// console.log(dmg);


const charAmbrData = (await readFromFile('gaming')).data;
createTalentsFromAmbr(charAmbrData);

// #########################################################################
// TODO

// correctly read data from json of characters with split scaling and
// multiple dmg instances on the same dmg instance (line 10 on the 
// createTalentsFromAmbr.js file)

// #########################################################################