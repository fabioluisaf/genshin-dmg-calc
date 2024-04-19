const ascensionLevelsLookupTable = [0, 20, 40, 50, 60, 70, 80];
const ascensionSectionLookupTable = [0, 38, 65, 101, 128, 155, 182];
const bonusAttributeMultLookupTable = [0, 0, 1, 2, 2, 3, 4];

function getAscensionMults(charLevel, hasAscended) {
  if (charLevel > 90 || charLevel < 1) {
    throw new Error(`Expected level to be between 1 and 90, but got ${charLevel}`);
  }

  let truncatedLevel = 0;

  ascensionLevelsLookupTable.forEach((lvl) => {
    if ((lvl === charLevel && hasAscended) || lvl < charLevel) {
      truncatedLevel = lvl;
    }
  });

  const ascensionLevel = ascensionLevelsLookupTable.indexOf(truncatedLevel);

  const ascensionMult = ascensionSectionLookupTable[ascensionLevel]/182;
  const bonusAttrMult = bonusAttributeMultLookupTable[ascensionLevel];
  
  return { ascensionMult, bonusAttrMult, ascensionLevel };
}

export default getAscensionMults;