import BUFF_FUNCTIONS from "./buffFunctionsLookupTable.js";

function applyBuffList(char) {
  const buffedAttrNames = Object.keys(char.buffList);
  const newChar = {...char};

  buffedAttrNames.forEach(attrName => {
    const buffFunction = BUFF_FUNCTIONS[attrName];

    if (!buffFunction) {
      throw new Error(`No buff function defined for ${attrName}`);
    }

    buffFunction(newChar, attrName, newChar.buffList[attrName]);
  });

  newChar.buffList = {};

  return newChar;
}

export default applyBuffList;