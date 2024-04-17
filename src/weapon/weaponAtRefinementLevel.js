import getBuffVariations from "../getBuffVariations.js";

function weaponAtRefinementLevel(weapon, refinementLevel, buffVariationName) {
  if (refinementLevel > 5 || refinementLevel < 1) {
    throw new Error(`Expected level between 1 and 5, but got ${refinementLevel}`);
  }

  const buffVariations = getBuffVariations(weapon);

  if (!buffVariations.includes(buffVariationName)) {
    throw new Error(`Couldn't find buff "${buffVariationName}" on weapon "${weapon.weaponName}" available buffs are "${buffVariations}"`);
  }

  const refinedWeapon = { ...weapon };
  
  refinedWeapon.weaponName += ` R${refinementLevel}${weapon.passive[buffVariationName].variationName}`; 
  refinedWeapon.passive = {
    attrNames: weapon.passive.attrNames,
    attrValues: weapon.passive[buffVariationName].attrValues.map(values => values[refinementLevel - 1])
  };

  return refinedWeapon;
}

export { getBuffVariations, weaponAtRefinementLevel };