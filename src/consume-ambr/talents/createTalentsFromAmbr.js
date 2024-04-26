import shouldIgnore from "./ignoreTalentModes.js";
import interpretModeStr from "./modeStrHandlers.js";
import getElement from "./findElement.js";

function getAllMvs(charAmbrData, talentNum, paramIndex) {
  const talentLvls = Object.keys(charAmbrData.talent[talentNum].promote);
  const mvs = [];

  talentLvls.forEach(lvl => {
    mvs.push(charAmbrData.talent[talentNum].promote[lvl].params[paramIndex]);
  });

  return mvs;
}

function appendMv(modeArr, charAmbrData, talentNum) {
  modeArr.forEach(mode => {
    mode.mv = getAllMvs(charAmbrData, talentNum, mode.paramIndex);
    delete mode.paramIndex;
  });
}

function appendElement(modeArr, charAmbrData, talentNum) {
  modeArr.forEach(mode => {
    if (mode.mainTag !== 'attack') {
      delete mode.inferredElement;
      // doesn't have an element
      return;
    }

    if (mode.inferredElement !== '') {
      mode.element = mode.inferredElement;
    } else {
      mode.element = getElement(charAmbrData, talentNum, mode.name);
    }
    
    delete mode.inferredElement;
  });
}

function basicAtkAsTag(basicAtkModeName) {
  if ((/charged/i).exec(basicAtkModeName)) {
    return 'charged attack';
  }

  if ((/plunge|plunging/i).exec(basicAtkModeName)) {
    return 'plunging attack';
  }

  if ((/\d+-hit/i).exec(basicAtkModeName)) {
    return 'normal attack';
  }
}

function modeNameAsTag(mode) {
  if (mode.mainTag === 'attack') {
    const modeName = mode.name.match(/(.*) dmg/i)[1]
    return modeName === 'Skill' ? '' : modeName.toLowerCase();
  }

  if (mode.mainTag === 'healing') {
    return 'healing';
  }
}

function talentNumAsTag(talentNum) {
  const dict = {
    '1': 'elemental skill',
    '3': 'elemental burst',
  }

  return dict[talentNum];
}

function appendOtherTags(modeArr, talentNum) {
  modeArr.forEach(mode => {
    mode.otherTags = [];
    
    if (talentNum === '0') {
      mode.otherTags.push(basicAtkAsTag(mode.name));
    } else {
      const modeName = modeNameAsTag(mode);
      if (modeName !== '') mode.otherTags.push(modeName);
      
      mode.otherTags.push(talentNumAsTag(talentNum));
    }
  });
}

function getTalentData(charAmbrData, talentNum) {
  let talentModes = [];

  charAmbrData.talent[talentNum].promote['1'].description
  .filter(mode => mode !== '' && !shouldIgnore(mode))
  .forEach(modeStr => {
    const newModes = interpretModeStr(modeStr);

    appendMv(newModes, charAmbrData, talentNum);
    appendElement(newModes, charAmbrData, talentNum);
    appendOtherTags(newModes, talentNum);

    talentModes = talentModes.concat(newModes);
  });

  return talentModes;
}

function createTalentsFromAmbr(charAmbrData) {
  const basicAtk = getTalentData(charAmbrData, '0');
  const elementalSkill = getTalentData(charAmbrData, '1');
  const elementalBurst = getTalentData(charAmbrData, '3');

  return {
    basicAtk,
    elementalSkill,
    elementalBurst,
  }
}

export default createTalentsFromAmbr;