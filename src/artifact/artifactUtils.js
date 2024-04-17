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
  const allVariations = getBuffVariations(artifactSet);
  const setThresholds = [];

  allVariations.forEach(variationName => {
    const threshold = artifactSet.passive[variationName].threshold;

    if (!setThresholds.includes(threshold) && threshold <= equipedAmt) {
      setThresholds.push(threshold);
    }
  });
  
  const maxThreshold = Math.max(...setThresholds);

  const possibleVariations = allVariations.filter(variationName => {
    return artifactSet.passive[variationName].threshold === maxThreshold;
  });

  return possibleVariations;
}

// returns the currently equiped artifact set, with only the correct passive bonuses
// based on equipedPiecesAmt and the selected passive variation, based on buffVariationName
function getEquippedArtifactSet(artifactSet, equipedPiecesAmt, buffVariationName) {
  const buffVariations = getPossibleArtifactPassives(artifactSet, equipedPiecesAmt);

  if (!buffVariations.includes(buffVariationName)) {
    throw new Error(`Couldn't find buff "${buffVariationName}" on artifact set "${artifactSet.artifactSetName}" available buffs are "${buffVariations}"`);
  }

  const artifactSetVariation = {
    artifactSetName: artifactSet.artifactSetName,
  };

  let variationAttrs = [];
  let variationVals = [];

  artifactSet.passive.attrNames.forEach((attrName, index) => {
    variationAttrs.push(attrName);
    variationVals.push(artifactSet.passive[buffVariationName].attrValues[index]);
  });

  artifactSetVariation.passive = {
    attrNames: variationAttrs,
    attrValues: variationVals
  }

  artifactSetVariation.artifactSetName += ` ${artifactSet.passive[buffVariationName].variationName}`
  
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


