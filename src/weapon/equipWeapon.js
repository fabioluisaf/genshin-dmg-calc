import addToBuffList from "../character/buffs/addToBuffList.js";
import { weaponAtRefinementLevel } from "./weaponAtRefinementLevel.js";

function equipWeapon(char, baseWeapon, refinementLevel, buffVariationName) {
  const refinedWeapon = weaponAtRefinementLevel(baseWeapon, refinementLevel, buffVariationName);
  char.equipedWeaponName = refinedWeapon.weaponName;
  char.baseAtk += refinedWeapon.baseAtk;

  addToBuffList(char, refinedWeapon.substat, refinedWeapon.substatVal);

  refinedWeapon.passive.attrNames.forEach((buff, weaponBuffIndex) => {
    const buffVal = refinedWeapon.passive.attrValues[weaponBuffIndex];

    addToBuffList(char, buff, buffVal);
  });
}

export default equipWeapon;