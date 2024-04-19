function addToBuffList(char, attrBuffedName, attrBuffedVal) {
  const charBuffs = char.attrBuffNames;
  const charBuffVals = char.attrBuffValues;

  if (!charBuffs.includes(attrBuffedName)) {
    charBuffs.push(attrBuffedName);
    charBuffVals.push(0);
  }

  const charBuffIndex = charBuffs.indexOf(attrBuffedName);

  charBuffVals[charBuffIndex] += attrBuffedVal;
}

export default addToBuffList;