import { MULT_TIER, LEVEL_MULT, ASC_VALUE } from "./lookupTables.js";

function levelUpWeapon(weapon) {
  const leveledWeapon = {...weapon};
  const rarity = weapon.rarity.toString();
  const tier = MULT_TIER[rarity][weapon.baseAtk.toString()];

  leveledWeapon.level = 90;
  leveledWeapon.baseAtk = weapon.baseAtk * 
                          LEVEL_MULT[rarity][tier-1] + 
                          ASC_VALUE[rarity];
  
  leveledWeapon.substatVal = weapon.substatVal * 4.594;

  return leveledWeapon;
}

export default levelUpWeapon;