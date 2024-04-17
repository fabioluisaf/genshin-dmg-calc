import applyBuffToChar from "./character/utils/applyBuffToChar.js";

/*
 * buffObj := An object where the first property is called attrNames, an array
 *  list containing the names of attributes to be buffed. The second property
 *  is called attrValues and is an arraylist containing the values for each attribute
 *  buffed.
*/

function equipBufftoChar(char, buffObj) {
  buffObj.attrNames.forEach((buff, equipmentBuffIndex) => {
    const buffVal = buffObj.attrValues[equipmentBuffIndex];
    applyBuffToChar(char, buff, buffVal);
  });
}

export default equipBufftoChar;