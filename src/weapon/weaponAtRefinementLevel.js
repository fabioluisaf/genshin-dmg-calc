import getBuffVariations from "../getBuffVariations.js";

function weaponAtRefinementLevel(weapon, refinementLevel, buffVariationName) {
  if (refinementLevel > 5 || refinementLevel < 1) {
    throw new Error(`Expected level between 1 and 5, but got ${refinementLevel}`);
  }

  const buffVariations = getBuffVariations(weapon.passives);
  
  if (!buffVariations.includes(buffVariationName)) {
    throw new Error(`Couldn't find buff "${buffVariationName}" on weapon "${weapon.weaponName}" available buffs are "${buffVariations}"`);
  }

  const refinedWeapon = { ...weapon };
  const variationName = weapon.passives[buffVariationName].variationName;
  const attrBuffedNames = Object.keys(weapon.passives[buffVariationName]);
  attrBuffedNames.splice(0, 1);
  
  refinedWeapon.weaponName += ` R${refinementLevel}`; 
  refinedWeapon.weaponName += variationName !== "" ? ` ${weapon.passives[buffVariationName].variationName}` : "";
  refinedWeapon.passives = {};
  
  attrBuffedNames.forEach(buffName => {
    refinedWeapon.passives[buffName] = weapon.passives[buffVariationName][buffName][refinementLevel-1];
  });

  return refinedWeapon;
}

export { getBuffVariations, weaponAtRefinementLevel };