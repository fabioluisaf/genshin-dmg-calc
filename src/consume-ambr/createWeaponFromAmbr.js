import { ASC_VALUE, LEVEL_MULT, MULT_TIER } from "../weapon/lookupTables.js";
import { ambrWeaponSubstatDict } from "./ambrDicts.js";

function getBaseAtk(weaponAmbrData) {
  const baseAtk = weaponAmbrData.upgrade.prop[0].initValue;
  const rarity = weaponAmbrData.rank.toString();
  const tier = MULT_TIER[rarity][baseAtk.toString()];

  return baseAtk * LEVEL_MULT[rarity][tier-1] + ASC_VALUE[rarity];
}

function getSubstat(weaponAmbrData) {
  const ambrName = weaponAmbrData.upgrade.prop[1].propType;
  const name = ambrWeaponSubstatDict[ambrName];
  const val = weaponAmbrData.upgrade.prop[1].initValue;

  return [name, val];
}

function createWeaponFromAmbr(weaponAmbrData) {
  const [substatName, substatVal] = getSubstat(weaponAmbrData);

  const baseWeapon = {
    name: weaponAmbrData.route,
    type: weaponAmbrData.type.toLowerCase(),
    rarity: weaponAmbrData.rank,
    level: 90,
    baseAtk: getBaseAtk(weaponAmbrData),
    constantStats: {
      [substatName]: substatVal * 4.594
    }
  };

  return baseWeapon;
}

export default createWeaponFromAmbr;