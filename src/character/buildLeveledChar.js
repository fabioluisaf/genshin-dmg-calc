import getMultipliers from "./leveling/statsMultipliers.js";
import bonusAttrDict from "./leveling/bonusAttributes.js";

function buildLeveledChar(baseChar, level, hasAscended = true) {
  if (level > 90 || level < 1) {
    throw new Error(`Expected level between 1 and 90, but got ${level}`);
  }
  
  const { levelMult, ascensionMult, bonusAttrMult, ascensionLevel } = getMultipliers(baseChar.rarity, level, hasAscended);
  console.log(baseChar.name, baseChar.bonusAttrName)
  const baseHp = baseChar.baseHp * levelMult + (ascensionMult * baseChar.maxAscensionHp);
  const baseAtk = baseChar.baseAtk * levelMult + (ascensionMult * baseChar.maxAscensionAtk);
  const baseDef = baseChar.baseDef * levelMult + (ascensionMult * baseChar.maxAscensionDef);
  const bonusAttrValue = bonusAttrDict[baseChar.bonusAttrName][baseChar.rarity-4] * bonusAttrMult;

  const leveledChar = {
    name: baseChar.name,
    level,
    ascensionLevel,
    rarity: baseChar.rarity,
    element: baseChar.element,
    weaponType: baseChar.weaponType,
    equipedWeaponName: undefined,
    bonusAttrName: baseChar.bonusAttrName,
    baseHp,
    baseAtk,
    baseDef,
    bonusAtk: 0,
    bonusDef: 0,
    bonusHp: 0,
    elementalMastery: 0,
    critRate: 0.05,
    critDmg: 0.5,
    healingBonus: 0,
    incomingHealingBonus: 0,
    energyRecharge: 1,
    cdReduction: 0,
    shieldStrength: 0,
    pctDmgBonus: {},
    additiveBaseDmgBonus: {},
    baseDmgMultipliers: {},
    enemyResReduction: {
      physical: 0,
      pyro: 0,
      dendro: 0,
      hydro: 0,
      electro: 0,
      anemo: 0,
      cryo: 0,
      geo: 0,
    },
    enemyDefIgnore: 0,
    enemyDefReduction: 0,
    buffList: {
      [baseChar.bonusAttrName]: bonusAttrValue
    }
  };

  return leveledChar
}

export default buildLeveledChar;