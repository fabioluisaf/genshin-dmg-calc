import addToBuffList from "../character/buffs/addToBuffList.js";
import weaponAtRefinementLevel from "./weaponAtRefinementLevel.js";

function equipWeapon(char, baseWeapon, refinementLevel, buffVariationName) {
  const refinedWeapon = weaponAtRefinementLevel(baseWeapon, refinementLevel, buffVariationName);
  char.equipedWeaponName = refinedWeapon.weaponName;
  char.baseAtk += refinedWeapon.baseAtk;

  addToBuffList(char, refinedWeapon.substat, refinedWeapon.substatVal);

  Object.keys(refinedWeapon.passives).forEach(attrName => {
    addToBuffList(char, attrName, refinedWeapon.passives[attrName]);
  });
}

export default equipWeapon;