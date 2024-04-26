import addToBuffList from "./buffs/addToBuffList.js";

function getSetBuffs(artifactSet, setEffectName) {
  const setEffect = artifactSet.setEffects.filter(setEffect => {
    return setEffect.name === setEffectName;
  })[0];

  const attrBuffs = Object.keys(setEffect).filter(key => key !== 'name');
  const setBuffs = {};

  attrBuffs.forEach(attrBuff => {
    setBuffs[attrBuff] = setEffect[attrBuff];
  });

  return setBuffs;
}

function equipArtifactSet(char, artifactSet, setEffectName) {
  const setBuffs = getSetBuffs(artifactSet, setEffectName);
  
  Object.keys(setBuffs).forEach(attr => {
    addToBuffList(char, attr, setBuffs[attr]);
  });
}

export default equipArtifactSet;