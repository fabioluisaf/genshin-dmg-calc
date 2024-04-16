import levelMultiplierLookupTable from "./levelMults.js";
import getAscensionMults from "./ascensionMults.js";

function getMultipliers(charRarity, charLevel, hasAscended) {
  const rarityCol = charRarity - 4;
  const levelMult = levelMultiplierLookupTable[charLevel-1][rarityCol];
  const { ascensionMult, bonusAttrMult, ascensionLevel } = getAscensionMults(charLevel, hasAscended);

  return { levelMult, ascensionMult, bonusAttrMult, ascensionLevel };
}

export default getMultipliers;