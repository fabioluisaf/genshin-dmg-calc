import BUFF_FUNCTIONS from "./buffFunctionsLookupTable.js";
import { applyDmgBonusPct } from "./dmgBonusPct.js";

function addBuff(char, attrName, attrVal) {
  const buffFunction = BUFF_FUNCTIONS[attrName] ? BUFF_FUNCTIONS[attrName] : applyDmgBonusPct;
  buffFunction(char, attrName, attrVal);
}

export default addBuff;