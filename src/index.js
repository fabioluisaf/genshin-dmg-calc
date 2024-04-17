import gaming from "./demo/demoChar.js";
import wgs from "./demo/demoWeapon.js";
import marechaussee from "./demo/demoArtifactSet.js";
import artifactPieces from "./demo/demoArtifactPieces.js";

import buildLeveldChar from "./character/buildLeveldChar.js";
import equipWeapon from "./weapon/equipWeapon.js";
import getBuffVariations from "./getBuffVariations.js";
import { equipArtifacts } from "./artifact/equipArtifacts.js";
import { getArtifactSetVariations } from "./artifact/getArtifactVariation.js";

const leveledGaming = buildLeveldChar(gaming, 80);
const weaponBuffVariations = getBuffVariations(wgs);
const artifactBuffVariations = getArtifactSetVariations(marechaussee, artifactPieces.length);

equipWeapon(leveledGaming, wgs, 1, weaponBuffVariations[0]);
equipArtifacts(leveledGaming, artifactPieces, artifactBuffVariations[0]);

console.log(leveledGaming);