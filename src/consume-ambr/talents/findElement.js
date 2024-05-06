import { ambrElementDict, ambrWeaponDict } from "../ambrDicts.js";

function basicAtkElement(charAmbrData, basicAtkMode) {
  const weaponType = ambrWeaponDict[charAmbrData.weaponType];
  const isChargedAtk = !!(/charged/i).exec(basicAtkMode);
  const convert = (isChargedAtk && weaponType === 'Bow') ||
                  weaponType === 'Catalyst';
  
  return convert ? ambrElementDict[charAmbrData.element] : 'physical';
}

function getElement(charAmbrData, talentNum, talentModeName) {
  if(talentNum === '0') {
    return basicAtkElement(charAmbrData, talentModeName);
  }

  return ambrElementDict[charAmbrData.element];
}

export default getElement;