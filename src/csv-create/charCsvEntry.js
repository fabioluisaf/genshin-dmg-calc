import applyBuffList from "../character/buffs/applyBuffList.js";
import { buildBonusBaseAttrs, buildElemPctStr } from "./convertAttr.js";

function createCharCsv(charNoBuffs) {
  const char = applyBuffList(charNoBuffs);
  let csvStr = '';

  csvStr += `${char.name} (Lvl: ${char.level}), `;
  csvStr += `${char.rarity}, `;
  csvStr += `${char.element}, `;
  csvStr += `${char.baseHp}, `;
  csvStr += `${char.baseAtk}, `;
  csvStr += `${char.baseDef}, `;
  csvStr += `${char.elementalMastery}, `;
  csvStr += `${char.critRate}, `;
  csvStr += `${char.critDmg}, `;
  csvStr += `${char.energyRecharge}`;
  csvStr += buildElemPctStr(char.pctDmgBonus) + ', ';
  csvStr += buildBonusBaseAttrs(charNoBuffs) + ', ';
  csvStr += `${char.healingBonus}`;

  return csvStr;
}

export default createCharCsv;