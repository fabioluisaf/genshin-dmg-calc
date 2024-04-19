import gaming from "./demo/demoChar.js";
import wgs from "./demo/demoWeapon.js";
import marechaussee from "./demo/demoArtifactSet.js";
import artifactPieces from "./demo/demoArtifactPieces.js";

import buildLeveldChar from "./character/buildLeveldChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import getBuffVariations from "./getBuffVariations.js";
import { equipArtifacts } from "./artifact/equipArtifacts.js";
import { equipedSetsAmts } from "./artifact/artifactUtils.js";
import { getPossibleArtifactPassives } from "./artifact/artifactUtils.js";
import applyBuffList from "./character/buffs/applyBuffList.js";

const leveledGaming = buildLeveldChar(gaming, 80);
const weaponBuffVariations = getBuffVariations(wgs);
const equipedSets = equipedSetsAmts(artifactPieces);
const artifactBuffVariations = getPossibleArtifactPassives(marechaussee, equipedSets[marechaussee.artifactSetName]);

equipWeapon(leveledGaming, wgs, 1, weaponBuffVariations[0]);
equipArtifacts(leveledGaming, artifactPieces, artifactBuffVariations[0]);
const newGaming = applyBuffList(leveledGaming);

console.log(newGaming);
