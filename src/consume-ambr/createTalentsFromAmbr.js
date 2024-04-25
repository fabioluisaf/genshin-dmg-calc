import { ambrElementDict, ambrWeaponDict } from "./ambrDicts.js";
import shouldIgnore from "./ignoreTalentModes.js";

function getTalentModes(charAmbrData, talentNumber) {
  const basicAtkModes = [];

  charAmbrData.talent[talentNumber].promote['1'].description
  .filter(mode => mode !== '' && !shouldIgnore(mode))
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

function basicAtkElement(charAmbrData, basicAtkMode) {
  const weaponType = ambrWeaponDict[charAmbrData.weaponType];
  const charElement = ambrElementDict[charAmbrData.element];

  const chargedAtkRegex = /charged/i;
  const plungeRegex = /plunge/i;

  const isChargedAtk = !!chargedAtkRegex.exec(basicAtkMode);
  const isPlunge = !!plungeRegex.exec(basicAtkMode);

  const convert = (isChargedAtk && (weaponType === 'catalyst' || weaponType === 'bow')) ||
                  (isPlunge && weaponType === 'catalyst');
  
  return convert ? charElement : 'physical';
}

function getElementFromText(charAmbrData, talentNum, talentMode) {
  return ambrElementDict[charAmbrData.element];
}

function getElement(charAmbrData, talentNum, talentMode) {
  if(talentNum === '0') {
    return basicAtkElement(charAmbrData, talentMode);
  }

  return getElementFromText(charAmbrData, talentNum, talentMode);
}

function getTalentData(charAmbrData, talentNum) {
  const talentModes = getTalentModes(charAmbrData, talentNum);
  const talentData = {};

  talentModes.forEach((mode, modeIndex) => {
    talentData[mode] = {
      mv: getAllModeMvs(charAmbrData, talentNum, modeIndex),
      element: getElement(charAmbrData, talentNum, mode),
    };
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