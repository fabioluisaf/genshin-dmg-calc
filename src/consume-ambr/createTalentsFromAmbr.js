function getTalentModes(charAmbrData, talentNumber) {
  const basicAtkModes = [];

  charAmbrData.talent[talentNumber].promote['1'].description
  .filter(mode => mode !== '')
  .forEach(mode => {
    const newName = mode.split('|')[0];
    
    if (newName === 'Low/High Plunge DMG') {
      basicAtkModes.push('Low Plunge DMG');
      basicAtkModes.push('High Plunge DMG');
    } else {
      basicAtkModes.push(newName);
    }
  });

  return basicAtkModes;
}

function getAllModeMvs(charAmbrData, talentNum, modeIndex) {
  const talentLvls = Object.keys(charAmbrData.talent[talentNum].promote);
  const mvs = [];

  talentLvls.forEach(lvl => {
    mvs.push(charAmbrData.talent[talentNum].promote[lvl].params[modeIndex]);
  });

  return mvs;
}

function getTalentData(charAmbrData, talentNum) {
  const talentModes = getTalentModes(charAmbrData, talentNum);
  const talentData = {};

  talentModes.forEach((mode, modeIndex) => {
    talentData[mode] = getAllModeMvs(charAmbrData, talentNum, modeIndex);

  });
  
  return talentData;
}

function createTalentsFromAmbr(charAmbrData) {
  const basicAtk = getTalentData(charAmbrData, '0');
  const elementalSkill = getTalentData(charAmbrData, '1');
  const elementalBurst = getTalentData(charAmbrData, '3');

  console.log(basicAtk);
  console.log(elementalSkill);
  console.log(elementalBurst);
}

export default createTalentsFromAmbr;