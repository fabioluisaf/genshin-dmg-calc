import addBuff from "../character/buffs/addBuff.js";

function equipWeapon(char, baseWeapon) {
  const charWithWeapon = {...char};

  charWithWeapon.equipedWeaponName = baseWeapon.name;
  charWithWeapon.baseAtk += baseWeapon.baseAtk;

  addBuff(charWithWeapon, charWithWeapon.bonusAttrName, charWithWeapon.bonusAttrVal);

  Object.keys(baseWeapon.constantStats).forEach(statName => {
    addBuff(charWithWeapon, statName, baseWeapon.constantStats[statName]);
  })

  return charWithWeapon;
}

export default equipWeapon;