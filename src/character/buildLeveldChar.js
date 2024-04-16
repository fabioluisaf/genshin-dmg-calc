import getMultipliers from "./utils/statsMultipliers.js";
import bonusAttrDict from "./utils/bonusAttributes.js";

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
    bonusAttrName: baseChar.bonusAttrName,
    baseHp,
    baseAtk,
    baseDef,
    attrBuffNames: [baseChar.bonusAttrName],
    attrBuffValues: [bonusAttrValue],
    critRate: 0.05,
    critDmg: 0.5
  };

  return leveledChar
}

export default buildLeveldChar;