
function getPassives(weaponAmbrData) {
  const passiveList = [];

  return passiveList;
}

function createWeaponFromAmbr(weaponAmbrData) {
  const baseWeapon = {
    weaponName: "",
    weaponType: "",
    level: 90,
    baseAtk: 0,
    substat: "",
    substatVal: 0,
    passives: getPassives(weaponAmbrData),
  };

  return baseWeapon;
}

export default createWeaponFromAmbr;