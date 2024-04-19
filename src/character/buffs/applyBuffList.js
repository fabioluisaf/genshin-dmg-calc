import BUFF_FUNCTIONS from "./buffFunctionsLookupTable.js";

function applyBuffList(char) {
  char.attrBuffNames.forEach((attrName, index) => {
    const buffFunction = BUFF_FUNCTIONS[attrName];
    const buffVal = char.attrBuffValues[index];

    buffFunction(char, attrName, buffVal);
  });

  const newChar = {...char};
  
  delete newChar.attrBuffNames;
  delete newChar.attrBuffValues;

  return newChar;
}

export default applyBuffList;