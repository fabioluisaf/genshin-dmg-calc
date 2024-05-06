import { applyFlatBuff } from "./flatBuff.js";
import { applyPctBuff } from "./pctBuff.js";

function getScalingValue(char, attrName) {
  switch (attrName) {
    case 'elementalMastery':
      return char.elementalMastery;
    case 'def':
      return char.baseDef + char.bonusDef;
    case 'maxHp':
      return char.baseHp + char.bonusHp;
    case 'energyRecharge':
      return char.energyRecharge;
    default:
      throw new Error(`${attrName} not found`);
  }
}

function applyVariableBuff(char, buffObj) {
  const variableStats = Object.keys(buffObj);

  if (variableStats.length === 0) {
    return;
  }

  variableStats.forEach(statName => {
    const stat = buffObj[statName];
    const charAttr = getScalingValue(char, stat.scalingAttr);
    const buffVal = stat.maxVal ? 
                    Math.min((charAttr - stat.reduceAttr) * stat.value, stat.maxVal) :
                    (charAttr - stat.reduceAttr) * stat.value;

    if (stat.type === 'additive dmg') {
      char.additiveBaseDmgBonus[statName] = buffVal;
    } else if (stat.type === 'flat') {
      applyFlatBuff(char, statName, buffVal);
    } else { // stat.type === 'pct'
      applyPctBuff(char, statName, buffVal)
    }
  });
}

export default applyVariableBuff;