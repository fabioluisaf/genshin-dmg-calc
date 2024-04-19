const ATTR_NAMES_CONVERSION = {
  atkPct: {
    attrToBuff: "bonusAtk",
    baseAttr: "baseAtk"
  },
  defPct: {
    attrToBuff: "bonusDef",
    baseAttr: "baseDef"
  },
  hpPct: {
    attrToBuff: "bonusHp",
    baseAttr: "baseHp"
  },
};

function applyPctBuff(char, buffAttrName, val) {
  const attrToBuff = ATTR_NAMES_CONVERSION[buffAttrName].attrToBuff;
  const baseAttr = ATTR_NAMES_CONVERSION[buffAttrName].baseAttr;

  if (!attrToBuff) {
    throw new Error(`Didn't find matching attribute for ${buffAttrName}`);
  }

  char[attrToBuff] += char[baseAttr]*val;
}

function removePctBuff(char, buffAttrName, val) {
  const attrToBuff = ATTR_NAMES_CONVERSION[buffAttrName].attrToBuff;
  const baseAttr = ATTR_NAMES_CONVERSION[buffAttrName].baseAttr;

  if (!attrToBuff) {
    throw new Error(`Didn't find matching attribute for ${buffAttrName}`);
  }

  char[attrToBuff] -= char[baseAttr]*val;
}

export { applyPctBuff, removePctBuff };