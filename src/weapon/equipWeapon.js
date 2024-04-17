import { applyBuffToChar } from "../character/utils/applyBuffToChar.js";
import { weaponAtRefinementLevel } from "./weaponUtils.js";

function equipWeapon(char, baseWeapon, refinementLevel, buffVariationName) {
  const refinedWeapon = weaponAtRefinementLevel(baseWeapon, refinementLevel, buffVariationName);
  char["equipedWeaponName"] = refinedWeapon.weaponName;
  char.baseAtk += refinedWeapon.baseAtk;

  applyBuffToChar(char, refinedWeapon.substat, refinedWeapon.substatVal);

  refinedWeapon.passive.attrNames.forEach((buff, weaponBuffIndex) => {
    const buffVal = refinedWeapon.passive.attrValues[weaponBuffIndex];

    applyBuffToChar(char, buff, buffVal);
  });
}

export { equipWeapon };