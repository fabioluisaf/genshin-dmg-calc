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

function talentNumAsTag(charAmbrData, talentNum) {
  let dict;

  if(charAmbrData.talent.hasOwnProperty('7')) {
    dict = {
      '1': 'elemental skill',
      '4': 'elemental burst',
    }
  } else {
    dict = {
      '1': 'elemental skill',
      '3': 'elemental burst',
    }
  }

  dict['0'] = 'basic attack';

  return dict[talentNum];
}

function appendOtherTags(charAmbrData, modeArr, talentNum) {
  modeArr.forEach(mode => {
    mode.otherTags = [];
    
    if (talentNum === '0') {
      mode.otherTags.push(basicAtkAsTag(mode.name));
    } else {
      const modeName = modeNameAsTag(mode);
      if (modeName !== '') mode.otherTags.push(modeName);
      
      mode.otherTags.push(talentNumAsTag(charAmbrData, talentNum));
    }
  });
}

function handleActiveTalent(charAmbrData, talentNum) {
  let talentModes = [];

  charAmbrData.talent[talentNum].promote['1'].description
  .filter(mode => mode !== '' && !shouldIgnore(mode))
  .forEach(modeStr => {
    const newModes = interpretModeStr(modeStr);

    appendMv(newModes, charAmbrData, talentNum);
    appendElement(newModes, charAmbrData, talentNum);
    appendOtherTags(charAmbrData, newModes, talentNum);

    talentModes = talentModes.concat(newModes);
  });

  return talentModes;
}

function getTalentData(charAmbrData, talentNum) {
  const isActiveTalent = charAmbrData.talent[talentNum].hasOwnProperty('promote');
  
  if (isActiveTalent && charAmbrData.talent[talentNum].promote.hasOwnProperty('2')) {
    return handleActiveTalent(charAmbrData, talentNum);
  }
}

function createTalentsFromAmbr(charAmbrData) {
  const talents = {};
  const talentIds = Object.keys(charAmbrData.talent);

  talentIds.forEach(talentId => {
    talents[talentNumAsTag(charAmbrData, talentId)] = getTalentData(charAmbrData, talentId);
  });


  return talents;
}

export default createTalentsFromAmbr;