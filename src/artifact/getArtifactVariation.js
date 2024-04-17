import getBuffVariations from "../getBuffVariations.js";

function getArtifactSetVariations(artifactSet, equipedAmt) {
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

function getArtifactVariation(artifactSet, equipedPiecesAmt, buffVariationName) {
  const buffVariations = getArtifactSetVariations(artifactSet, equipedPiecesAmt);

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

export { getArtifactVariation, getArtifactSetVariations };