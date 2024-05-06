import { ambrPropDict, ambrBonusAttrDict, ambrElementDict, ambrWeaponDict } from "./ambrDicts.js";

function getBaseStats(charAmbrData) {
  const baseStats = {}
  charAmbrData.upgrade.prop.forEach(prop => {
    const key = 'base' + ambrPropDict[prop.propType];
    baseStats[key] = prop.initValue;
  });

  return baseStats;
}

function getMaxAscensionStats(charAmbrData) {
  const maxStats = {}
  
  Object.keys(charAmbrData.upgrade.promote[6].addProps).forEach(prop => {
    if (ambrPropDict[prop]) {
      const key = 'maxAscension' + ambrPropDict[prop];
      maxStats[key] = charAmbrData.upgrade.promote[6].addProps[prop];
    }
  });
  
  return maxStats;
}

function createCharFromAmbr(charAmbrData) {
  const { baseHp, baseAtk, baseDef } = getBaseStats(charAmbrData);
  const { maxAscensionHp, maxAscensionAtk, maxAscensionDef } = getMaxAscensionStats(charAmbrData);

  const baseChar = {
    id: charAmbrData.id.toString(),
    name: charAmbrData.route,
    rarity: charAmbrData.rank,
    weaponType: ambrWeaponDict[charAmbrData.weaponType],
    baseHp,
    baseAtk,
    baseDef,
    maxAscensionHp,
    maxAscensionAtk,
    maxAscensionDef,
    bonusAttrName: ambrBonusAttrDict[charAmbrData.specialProp],
    element: ambrElementDict[charAmbrData.element],
  };

  return baseChar;
}

export default createCharFromAmbr;