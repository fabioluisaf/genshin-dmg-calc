import addToBuffList from "./character/buffs/addToBuffList.js";

function getEquipedPieces(...setEffectNames) {
  const regex = /(\d)pcs/;
  const result = {
    pieces: 0,
    name: ''
  }

  setEffectNames.forEach(name => {
    const match = name.match(regex);
    const pieces = Number(match[1]);

    if (pieces > result.pieces) {
      result.pieces = pieces;
      result.name = match.input;
    }
  });

  return result.name
}

function applyArtifactBuffs(char, artifactSet, ...setEffectNames) {
  char.equipedArtifactSets.push(`${artifactSet.name} ${getEquipedPieces(...setEffectNames)}`);

  const variations = artifactSet.setEffects.filter(setEffect => {
    return setEffectNames.includes(setEffect.name);
  });

  const buffs = {};

  variations.forEach(variation => {
    Object.keys(variation.buffs).forEach(attr => buffs[attr] = variation.buffs[attr]);
  });
  
  Object.keys(buffs).forEach(attr => {
    addToBuffList(char, attr, buffs[attr]);
  });
}

export default applyArtifactBuffs;