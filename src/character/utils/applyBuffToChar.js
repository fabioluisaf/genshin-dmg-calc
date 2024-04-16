export function applyBuffToChar(char, buffName, buffVal) {
  const charBuffs = char.attrBuffNames;
  const charBuffVals = char.attrBuffValues;

  if (!charBuffs.includes(buffName)) {
    charBuffs.push(buffName);
    charBuffVals.push(0);
  }

  const charBuffIndex = charBuffs.indexOf(buffName);

  charBuffVals[charBuffIndex] += buffVal;
}
