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
  er: applyFlatBuff,
  em: applyFlatBuff,
  defFlat: applyFlatBuff,
  pyroDmgBonus: applyDmgBonusPct,
  hydroDmgBonus: applyDmgBonusPct,
  physicalDmgBonus: applyDmgBonusPct,
  electroDmgBonus: applyDmgBonusPct,
  geoDmgBonus: applyDmgBonusPct,
  dendroDmgBonus: applyDmgBonusPct,
  anemoDmgBonus: applyDmgBonusPct,
  cryoDmgBonus: applyDmgBonusPct,
  chargedAtk: applyDmgBonusPct,
  normalAtk: applyDmgBonusPct,
  elementalSkill: applyDmgBonusPct,
  charmedCloudstrider: applyDmgBonusPct,
};

export default BUFF_FUNCTIONS;