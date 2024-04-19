import BUFF_FUNCTIONS from "./buffFunctionsLookupTable.js";

function applyBuffList(char) {
  const buffedAttrNames = Object.keys(char.buffList);
  const newChar = {...char};

  buffedAttrNames.forEach(attrName => {
    const buffFunction = BUFF_FUNCTIONS[attrName];

    buffFunction(newChar, attrName, newChar.buffList[attrName]);
  });

  delete newChar.buffList;

  return newChar;
}

export default applyBuffList;