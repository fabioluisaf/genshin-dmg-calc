import getBuffVariations from "../getBuffVariations.js";
import getArtifactSetsList from "./artifactList.js";

// returns a dict of artifact sets equipped and their respective amounts
function equipedSetsAmts(artifactPieces) {
  const artifactsEquiped = {};

  artifactPieces.forEach(artifact => {
    if (!Object.keys(artifactsEquiped).includes(artifact.artifactSetName)) {
      artifactsEquiped[artifact.artifactSetName] = 0;
    }

    artifactsEquiped[artifact.artifactSetName]++;
  });

  return artifactsEquiped;
}

// return a list of all possible passive variation names based on equipedAmt
function getPossibleArtifactPassives(artifactSet, equipedAmt) {
  const allVariations = getBuffVariations(artifactSet.setEffects);
  const setThresholds = [];
  
  allVariations.forEach(variationName => {
    const threshold = artifactSet.setEffects[variationName].threshold;

    if (!setThresholds.includes(threshold) && threshold <= equipedAmt) {
      setThresholds.push(threshold);
    }
  });
  
  const maxThreshold = Math.max(...setThresholds);

  const possibleVariations = allVariations.filter(variationName => {
    return artifactSet.setEffects[variationName].threshold === maxThreshold;
  });

  return possibleVariations;
}

function getAttributesBuffed(artifactSet, effectVariationName) {
  const attrsBuffed = Object.keys(artifactSet.setEffects[effectVariationName]);
  attrsBuffed.splice(0, 2);

  return attrsBuffed;
}

// returns the currently equiped artifact set, with only the correct passive bonuses
// based on equipedPiecesAmt and the selected passive variation, based on buffVariationName
function getEquippedArtifactSet(artifactSet, equipedPiecesAmt, effectVariationName) {
  const buffVariations = getPossibleArtifactPassives(artifactSet, equipedPiecesAmt);

  if (!buffVariations.includes(effectVariationName)) {
    throw new Error(`Couldn't find buff "${effectVariationName}" on artifact set "${artifactSet.artifactSetName}" available buffs are "${buffVariations}"`);
  }

  const variationBuffs = getAttributesBuffed(artifactSet, effectVariationName);
  const artifactSetVariation = {
    artifactSetName: artifactSet.artifactSetName,
    setEffects: {}
  };

  variationBuffs.forEach(attrName => {
    artifactSetVariation.setEffects[attrName] = artifactSet.setEffects[effectVariationName][attrName];
  });

  artifactSetVariation.artifactSetName += ` ${artifactSet.setEffects[effectVariationName].variationName}`
  
  return artifactSetVariation;
}

// returns a list of all currently eqquiped artifact sets, based on the 
// artifactPieces list, with only the active passive bonuses based on buffVariationName
function getEquippedArtifactSetsList(artifactPieces, buffVariationName) {
  const artifactSetsFullList = getArtifactSetsList();
  const artifactsEquipedAmt = equipedSetsAmts(artifactPieces);
  const artifactSetsEquiped = [];

  Object.keys(artifactsEquipedAmt).forEach(setName => {
    const setObj = artifactSetsFullList.filter(set => set.artifactSetName === setName)[0];
    const equipedAmt = artifactsEquipedAmt[setName];

    const setVariation = getEquippedArtifactSet(setObj, equipedAmt, buffVariationName);

    artifactSetsEquiped.push(setVariation);
  });

  return artifactSetsEquiped;
}

export { getEquippedArtifactSet, getPossibleArtifactPassives, getEquippedArtifactSetsList, equipedSetsAmts };


