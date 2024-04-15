import getMultipliers from "./stat-calcs/statsMultipliers.js";
import bonusAttrDict from "./stat-calcs/bonusAttributes.js";

function buildFullChar(baseChar, level, hasAscended = true) {
  const { levelMult, ascensionMult, bonusAttrMult, ascensionLevel } = getMultipliers(baseChar.rarity, level, hasAscended);

  const baseHp = baseChar.baseHp * levelMult + (ascensionMult * baseChar.maxAscensionHp);
  const baseAtk = baseChar.baseAtk * levelMult + (ascensionMult * baseChar.maxAscensionAtk);
  const baseDef = baseChar.baseDef * levelMult + (ascensionMult * baseChar.maxAscensionDef);
  const bonusAttr = bonusAttrDict[baseChar.bonusAttrName][baseChar.rarity-4] * bonusAttrMult;

  const leveledChar = {
    charName: baseChar.charName,
    level,
    ascensionLevel,
    rarity: baseChar.rarity,
    bonusAttrName: baseChar.bonusAttrName,
    element: baseChar.element,
    weapon: baseChar.weapon,
    bonusAttrName: baseChar.bonusAttrName,
    baseHp,
    baseAtk,
    baseDef,
    bonusAttr,
    critRate: 0.05,
    critDmg: 0.5
  };

  console.log(leveledChar);

  return leveledChar
}

export default buildFullChar;