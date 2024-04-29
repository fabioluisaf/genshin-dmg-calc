function weaponAtRefinementLevel(weapon, refinementLevel, passiveName = "") {
  if (refinementLevel > 5 || refinementLevel < 1) {
    throw new Error(`Expected level between 1 and 5, but got ${refinementLevel}`);
  }

  if (passiveName === "") {
    passiveName = weapon.passives[0].name;
  }

  const buffVariations = weapon.passives.map((passive) => {
    return passive.name;
  });

  const filteredPassives = weapon.passives.filter(passive => {
    return passive.name === passiveName;
  })
  
  if (filteredPassives.length === 0) {
    throw new Error(`Couldn't find buff "${passiveName}" on weapon "${weapon.name}" available buffs are "${buffVariations}"`);
  }

  const passive = filteredPassives[0];

  const refinedWeapon = { ...weapon };
  
  refinedWeapon.name += ` R${refinementLevel}`; 
  refinedWeapon.name += passiveName !== "" ? ` (${passiveName})` : "";
  refinedWeapon.passives = {};
  
  Object.keys(passive.buffs).forEach(attr => {
    refinedWeapon.passives[attr] = passive.buffs[attr][refinementLevel-1];
  }); 

  return refinedWeapon;
}

export default weaponAtRefinementLevel;