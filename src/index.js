import demoChar from "./demoChar.js";
import demoWeapon from "./demoWeapon.js";

import buildLeveldChar from "./character/buildLeveldChar.js";
import { equipWeapon } from "./weapon/equipWeapon.js";
import { getBuffVariations } from "./weapon/weaponUtils.js";

const leveledChar = buildLeveldChar(demoChar, 80);
const buffVariations = getBuffVariations(demoWeapon);

equipWeapon(leveledChar, demoWeapon, 1, buffVariations[0]);

console.log(leveledChar);