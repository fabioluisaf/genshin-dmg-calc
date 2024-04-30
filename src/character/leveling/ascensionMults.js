const ascensionLevelsLookupTable = [0, 20, 40, 50, 60, 70, 80];
const ascensionSectionLookupTable = [0, 38, 65, 101, 128, 155, 182];
const bonusAttributeMultLookupTable = [0, 0, 1, 2, 2, 3, 4];

function getAscensionMults(charLevel, hasAscended) {
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