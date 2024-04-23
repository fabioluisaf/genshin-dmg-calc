import getMultipliers from "./leveling/statsMultipliers.js";
import bonusAttrDict from "./leveling/bonusAttributes.js";

function buildLeveldChar(baseChar, level, hasAscended = true) {
  if (level > 90 || level < 1) {
    throw new Error(`Expected level between 1 and 90, but got ${level}`);
  }
  
  const { levelMult, ascensionMult, bonusAttrMult, ascensionLevel } = getMultipliers(baseChar.rarity, level, hasAscended);

  const baseHp = baseChar.baseHp * levelMult + (ascensionMult * baseChar.maxAscensionHp);
  const baseAtk = baseChar.baseAtk * levelMult + (ascensionMult * baseChar.maxAscensionAtk);
  const baseDef = baseChar.baseDef * levelMult + (ascensionMult * baseChar.maxAscensionDef);
  const bonusAttrValue = bonusAttrDict[baseChar.bonusAttrName][baseChar.rarity-4] * bonusAttrMult;

  const leveledChar = {
    charName: baseChar.charName,
    level,
    ascensionLevel,
    rarity: baseChar.rarity,
    element: baseChar.element,
    weaponType: baseChar.weaponType,
    equipedWeaponName: undefined,
    equipedArtifactSets: [],
    buffs: [],
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
    buffList: {
      [baseChar.bonusAttrName]: bonusAttrValue
    }
  };

  return leveledChar
}

export default buildLeveldChar;