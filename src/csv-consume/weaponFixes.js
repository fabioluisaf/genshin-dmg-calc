const NEED_FIXING = [
  'Makhaira Aquamarine R1',
  'Redhorn Stonethresher R1',
  'Cinnabar Spindle R5',
  'Xiphos\' Moonlight R1',
  'Skyward Blade R1',
  'Primordial Jade Cutter R1',
  'Key of Khaj-Nisut R1 (3 stacks)',
  'Light of Foliar Incision R1 (Passive Up)',
  'Halberd R5 (Passive only once/10s)',
  'Crescent Pike R1 (Passive Up)',
  'Staff of Homa R1 (>50% HP)',
  'Staff of Homa R1 (<50% HP)',
  'Engulfing Lightning R1',
  'Staff of the Scarlet Sands R1 (3 stacks)',
  'Hunter\'s Path R1',
  'Wandering Evenstar R1',
  'Everlasting Moonglow R1',
];

function addVariableBuff(weaponObj, attrName, value, scalingAttr, type, reduceAttr = 0, maxVal) {
  weaponObj.variableStats[attrName] = {
    value,
    scalingAttr,
    reduceAttr,
    maxVal,
    type,
  }
}

function addProcDmg(weaponObj, value, scalingAttr) {
  weaponObj.proc = {
    mv: value,
    scalingAttr
  }
}

function fixWeapons(weapons, fixIndexes) {
  // Makhaira Aquamarine R1
  addVariableBuff(weapons[fixIndexes[0]], 'atkFlat', 0.24, 'elementalMastery', 'flat'); 
  
  // Redhorn Stonethresher R1
  addVariableBuff(weapons[fixIndexes[1]], 'normal attack', 0.4, 'def', 'additive dmg');          
  addVariableBuff(weapons[fixIndexes[1]], 'charged attack', 0.4, 'def', 'additive dmg');   

  // Cinnabar Spindle R5
  addVariableBuff(weapons[fixIndexes[2]], 'elemental skill', 0.8, 'def', 'additive dmg');

  // Xiphos' Moonlight R1
  addVariableBuff(weapons[fixIndexes[3]], 'energyRecharge', 0.00036, 'elementalMastery', 'flat');

  // Skyward Blade R1
  addProcDmg(weapons[fixIndexes[4]], 0.2, 'atk');      

  // Primordial Jade Cutter R1
  addVariableBuff(weapons[fixIndexes[5]], 'atkFlat', 0.012, 'maxHp', 'flat');

  // Key of Khaj-Nisut R1 (3 stacks)
  addVariableBuff(weapons[fixIndexes[6]], 'elementalMastery', 0.0012*3 + 0.002, 'maxHp', 'flat');

  // Light of Foliar Incision R1 (Passive Up)
  addVariableBuff(weapons[fixIndexes[7]], 'normal attack', 1.2, 'elementalMastery', 'additive dmg');          
  addVariableBuff(weapons[fixIndexes[7]], 'elemental skill', 1.2, 'elementalMastery', 'additive dmg');   

  // Halberd R5 (Passive only once/10s)
  addProcDmg(weapons[fixIndexes[8]], 3.2, 'atk');

  // Crescent Pike R1 (Passive Up)
  addProcDmg(weapons[fixIndexes[9]], 0.2, 'atk');

  // Staff of Homa R1 (>50% HP)
  addVariableBuff(weapons[fixIndexes[10]], 'atkFlat', 0.008, 'maxHp', 'flat');   
  
  // Staff of Homa R1 (<50% HP)
  addVariableBuff(weapons[fixIndexes[11]], 'atkFlat', 0.018, 'maxHp', 'flat'); 

  // Engulfing Lightning R1
  addVariableBuff(weapons[fixIndexes[12]], 'atkPct', 0.28, 'energyRecharge', 'pct', 1, 0.8); 

  // Staff of the Scarlet Sands R1 (3 stacks)
  addVariableBuff(weapons[fixIndexes[13]], 'atkFlat', 0.52 + 0.28*3, 'elementalMastery', 'flat');

  // Hunter\'s Path R1
  addVariableBuff(weapons[fixIndexes[14]], 'charged attack', 1.6, 'elementalMastery', 'additive dmg');

  // Wandering Evenstar R1
  addVariableBuff(weapons[fixIndexes[15]], 'atkFlat', 0.24, 'elementalMastery', 'flat');

  // Everlasting Moonglow R1
  addVariableBuff(weapons[fixIndexes[16]], 'normal attack', 0.01, 'maxHp', 'additive dmg');

}

export default fixWeapons;