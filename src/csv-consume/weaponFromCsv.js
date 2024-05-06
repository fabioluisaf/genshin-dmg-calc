function parseData(data) {
  const asNumber = Number(data);

  if(!isNaN(asNumber)) {
    return asNumber;
  }

  if(data.match(/%/)) {
    const numeric = Number(data.split('%')[0]);
    return numeric/100;
  }

  if(data.match(/#REF!/)) {
    return undefined;
  }

  return data;
}

function createWeaponFromCsv(weaponCsv, header) {
  const weaponData = weaponCsv.split(',').map(col => parseData(col));
  
  const commonKeys = ["type", "rarity", "baseAtk"];

  const otherStats = [
    'elementalMastery', 'critRate', 'critDmg', 'energyRecharge', 'physicalDmgBonus', 
    'atkPct', 'defPct', 'hpPct', 'healingBonus', 'dmg', 'normal attack', 
    'charged attack', 'plunging attack', 'elemental skill', 'elemental burst', 'atkFlat',
    'Additive Base DMG Normal Attack', 'Additive Base DMG Charged Attacks',
    'Additive Base DMG Charged Attack', 'Additive Base DMG Elemental Skill', 'Bond of Life% (BoL)'
  ];

  const elementalDmg = [
    'pyroDmgBonus', 'hydroDmgBonus', 'electroDmgBonus',
    'geoDmgBonus', 'dendroDmgBonus', 'anemoDmgBonus', 'cryoDmgBonus'
  ];

  const weaponObj = {
    name: '',
    type: '',
    rarity: 0,
    baseAtk: 0,
    constantStats: {},
    variableStats: {}
  };

  weaponObj["name"] = weaponCsv.split(',')[0];

  commonKeys.forEach(key => {
    const index = header.indexOf(key)
    weaponObj[key] = weaponData[index];
  });

  otherStats.forEach(stat => {
    const index = header.indexOf(stat);
    const val = weaponData[index];
    // console.log(stat, index, val)
    if(val && val !== 0) {
      weaponObj.constantStats[stat] = val;
    } else if (val === undefined){
      weaponObj.variableStats[stat] = val;
    }
  });

  elementalDmg.forEach(elem => {
    const index = header.indexOf('Elemental DMG');
    const val = weaponData[index];

    if (val !== 0) {
      weaponObj.constantStats[elem] = val;
    }
  });
  
  return weaponObj;
}

export default createWeaponFromCsv;