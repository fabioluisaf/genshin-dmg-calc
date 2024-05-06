import addBuff from "../character/buffs/addBuff.js";

function equipWeapon(char, weapon) {
  if (char.weaponType !== weapon.type) {
    throw new Error(`Can't equip ${weapon.type} to a character whose weapon type is ${char.weaponType}`)
  }
  const charWithWeapon = {...char};

  charWithWeapon.equipedWeaponName = weapon.name;
  charWithWeapon.baseAtk += weapon.baseAtk;

  addBuff(charWithWeapon, charWithWeapon.bonusAttrName, charWithWeapon.bonusAttrVal);

  Object.keys(weapon.constantStats).forEach(statName => {
    addBuff(charWithWeapon, statName, weapon.constantStats[statName]);
  })

  return charWithWeapon;
}

export default equipWeapon;