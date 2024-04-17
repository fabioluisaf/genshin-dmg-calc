import buildLeveldChar from "./character/buildLeveldChar.js";
import equipWeapon from "./equipment/equipWeapon.js";
import getBuffVariations from "./getBuffVariations.js";

import gaming from "./demo/demoChar.js";
import wgs from "./demo/demoWeapon.js";
import marechaussee from "./demo/demoArtifactSet.js";
import artifactPieces from "./demo/demoArtifactPieces.js";

const leveledGaming = buildLeveldChar(gaming, 80);
const weaponBuffVariations = getBuffVariations(wgs);
const artifactBuffVariations = getBuffVariations(marechaussee);

equipWeapon(leveledGaming, wgs, 1, weaponBuffVariations[0]);

console.log(leveledGaming);