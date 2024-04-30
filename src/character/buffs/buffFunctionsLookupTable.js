import { applyDmgBonusPct } from "./dmgBonusPct.js";
import { applyFlatBuff } from "./flatBuff.js";
import { applyPctBuff } from "./pctBuff.js";

const BUFF_FUNCTIONS = {
  atkPct: applyPctBuff,
  defPct: applyPctBuff,
  hpPct: applyPctBuff,
  critRate: applyFlatBuff,
  hpFlat: applyFlatBuff,
  atkFlat: applyFlatBuff,
  critDmg: applyFlatBuff,
  energyRecharge: applyFlatBuff,
  elementalMastery: applyFlatBuff,
  defFlat: applyFlatBuff,
  healingBonus: applyFlatBuff,
};

export default BUFF_FUNCTIONS;