function getElementFromMvData(mvData) {
  const elements = [
    /(pyro)/i, 
    /(dendro)/i, 
    /(hydro)/i, 
    /(electro)/i, 
    /(anemo)/i, 
    /(cryo)/i, 
    /(geo)/i, 
    /(physical)/i
  ];
  let inferredElement = '';
  
  elements.forEach(elementRegex => {
    const matchRes = mvData.match(elementRegex);

    if (matchRes) {
      inferredElement = matchRes[1];
      return;
    }
  });

  return inferredElement;
}

function getScalingFromMvData(mvData) {
  const scalings = [/(atk)/i, /(def)/i, /(hp)/i, /(max hp)/i, /(elemental mastery)/i];
  let scalingAttr = 'atk';
  
  scalings.forEach(scalingRegex => {
    const matchRes = mvData.match(scalingRegex);

    if (matchRes && (/(elemental mastery)/i).exec(matchRes[1])) {
      scalingAttr = 'elementalMastery';
      return;
    }

    if (matchRes) {
      scalingAttr = matchRes[1].toLowerCase();
      return;
    }
  });

  return scalingAttr;
}

function handlePlungeDmg(nameData, mvData) {
  const lowPNameData = 'Low Plunge DMG';
  const highPNameData = 'High Plunge DMG';
  const [lowPMvData, highPMvData] = mvData.split('/');

  const lowPObj = handleRegularMode(lowPNameData, lowPMvData);
  const highPObj = handleRegularMode(highPNameData, highPMvData);

  return [lowPObj, highPObj];
}

function handleStackedModes(nameData, mvData) {
  if (nameData === 'Low/High Plunge DMG') {
    return handlePlungeDmg(nameData, mvData);
  }

  const scalings = mvData.split('+');
  const modes = [];

  scalings.forEach((scaling, index) => {
    const scalingAttr = getScalingFromMvData(scaling);
    const inferredElement = getElementFromMvData(scaling);
    const subModeName = inferredElement !== '' ?
                        `${nameData} | ${inferredElement} - Hit ${index+1}` :
                        `${nameData} | ${scalingAttr.toUpperCase()} - Hit ${index+1}`;

    modes.push(handleRegularMode(subModeName, scaling));
  });

  return modes;
}

function getMainTag(nameData) {
  if ((/dmg/i).exec(nameData)) {
    return 'dmg';
  } 
  
  if ((/healing|regeneration|restored/i).exec(nameData)) {
    return 'healing';
  }

  return 'buff';
}

function handleRegularMode(nameData, mvData) {
  return {
    name: nameData,
    mainTag: getMainTag(nameData),
    paramIndex: (Number(mvData.match(/param(\d+)/)[1]) - 1),
    scalingAttr: getScalingFromMvData(mvData),
    inferredElement: getElementFromMvData(mvData),
  };
}

function interpretModeStr(modeStr) {
  const inferredModes = [];
  const [nameData, mvData] = modeStr.split('|');
  let modeObjs;
  
  if(nameData.includes('/') || mvData.includes('+')) {
    modeObjs = handleStackedModes(nameData, mvData);
  } else {
    modeObjs = [handleRegularMode(nameData, mvData)];
  }
  
  modeObjs.forEach(modeObj => {
    inferredModes.push(modeObj);
  });

  return inferredModes
}


export default interpretModeStr;