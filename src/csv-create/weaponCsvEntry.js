function getSubstatStr(weapon) {
  const statsList = ['elementalMastery','critRate','critDmg','energyRecharge','electroDmgBonus','geoDmgBonus','pyroDmgBonus','hydroDmgBonus','cryoDmgBonus','anemoDmgBonus','dendroDmgBonus','physicalDmgBonus','atkPct','defPct','hpPct','healingBonus'];

  let finalStr = '';

  statsList.forEach(stat => {
    let val = '0';

    if(weapon.substat === stat) {
      val = weapon.substatVal.toString();
    }

    finalStr += val + ', ';
  });

  return finalStr;
}

function createWeaponCsv(weapon) {
  let csvStr = '';

  csvStr += `${weapon.name}, `;
  csvStr += `${weapon.rarity}, `;
  csvStr += `${weapon.baseAtk}, `;
  csvStr += getSubstatStr(weapon);

  return csvStr;
}

export default createWeaponCsv;