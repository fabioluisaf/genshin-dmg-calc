const ATTR_NAMES_CONVERSION = {
  atkFlat: "bonusAtk",
  defFlat: "bonusDef",
  hpFlat: "bonusHp",
  critRate: "critRate",
  critDmg: "critDmg",
  energyRecharge: "energyRecharge",
  defPct: "defPct",
  elementalMastery: "elementalMastery",
  healingBonus: 'healingBonus',
};

function applyFlatBuff(char, buffAttrName, val) {
  const attrToBuff = ATTR_NAMES_CONVERSION[buffAttrName];

  if (!attrToBuff) {
    throw new Error(`Didn't find matching attribute for ${buffAttrName}`);
  }
  
  char[attrToBuff] += val;
}

function removeFlatBuff(char, buffAttrName, val) {
  const attrToBuff = ATTR_NAMES_CONVERSION[buffAttrName];

  if (!attrToBuff) {
    throw new Error(`Didn't find matching attribute for ${buffAttrName}`);
  }

  char[attrToBuff] -= val;
}

export { applyFlatBuff, removeFlatBuff };