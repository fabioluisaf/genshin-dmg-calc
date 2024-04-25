import BUFF_FUNCTIONS from "./buffFunctionsLookupTable.js";
import { applyDmgBonusPct } from "./dmgBonusPct.js";

function applyBuffList(char) {
  const buffedAttrNames = Object.keys(char.buffList);
  const newChar = {...char};

  buffedAttrNames.forEach(attrName => {
    const buffFunction = BUFF_FUNCTIONS[attrName];

    if (!buffFunction) {
      applyDmgBonusPct(newChar, attrName, newChar.buffList[attrName]);
      return;
    }

    buffFunction(newChar, attrName, newChar.buffList[attrName]);
  });

  newChar.buffList = {};

  return newChar;
}

export default applyBuffList;