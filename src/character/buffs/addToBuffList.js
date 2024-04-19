function addToBuffList(char, attrName, attrVal) {
  if (!Object.keys(char.buffList).includes(attrName)) {
    char.buffList[attrName] = 0;
  }

  char.buffList[attrName] += attrVal;
}

export default addToBuffList;