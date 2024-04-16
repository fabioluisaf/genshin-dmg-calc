import buildLeveldChar from "./character/buildLeveldChar.js";
import { equipWeapon } from "./weapon/equipWeapon.js";
import { getBuffVariations } from "./weapon/weaponUtils.js";

import gaming from "./demoChar.js";
import wgs from "./demoWeapon.js";
import marechaussee from "./demoArtifactSet.js";
import artifacts from "./demoArtifactPieces.js";

const leveledChar = buildLeveldChar(gaming, 80);
const buffVariations = getBuffVariations(wgs);

equipWeapon(leveledChar, wgs, 1, buffVariations[0]);

console.log(leveledChar);