import { applyBuffToChar } from "../character/utils/applyBuffToChar.js";
import getArtifactSetsList from "./artifactList.js";
import { getArtifactVariation } from "./getArtifactVariation.js";

function getArtifactVariationsEquiped(artifactPieces, buffVariationName) {
  const artifactSetsFullList = getArtifactSetsList();
  const artifactsEquiped = {};
  const artifactVariationsEquiped = [];

  artifactPieces.forEach(artifact => {
    if(!Object.keys(artifactsEquiped).includes(artifact.artifactSetName)) {
      artifactsEquiped[artifact.artifactSetName] = 0;
    }

    artifactsEquiped[artifact.artifactSetName]++;
  });

  Object.keys(artifactsEquiped).forEach(setName => {
    const setObj = artifactSetsFullList.filter(set => set.artifactSetName === setName)[0];
    const equipedAmt = artifactsEquiped[setName];
    const setVariation = getArtifactVariation(setObj, equipedAmt, buffVariationName);

    artifactVariationsEquiped.push(setVariation);
  });

  return artifactVariationsEquiped;
}

function equipPiece(char, artifactPiece) {
  const mainStatName = artifactPiece.artifactMainStatName;
  const mainStatVal = artifactPiece.artifactMainStatVal;

  applyBuffToChar(char, mainStatName, mainStatVal);

  artifactPiece.artifactSubstatsName.forEach((substatName, index) => {
    const substatVal = artifactPiece.artifactSubstatsVal[index];
    applyBuffToChar(char, substatName, substatVal);
  });
}

function equipArtifacts(char, artifactPieces, buffVariationName) {
  const artifactVariationsEquiped = getArtifactVariationsEquiped(artifactPieces, buffVariationName);
  
  artifactVariationsEquiped.forEach(set => {
    char.equipedArtifactSets.push(set.artifactSetName);
    
    set.passive.attrNames.forEach((attrName, index) =>{
      const buffVal = set.passive.attrValues[index];
      applyBuffToChar(char, attrName, buffVal);
    });
  });

  artifactPieces.forEach(piece => equipPiece(char, piece));
}

export { equipArtifacts, getArtifactVariationsEquiped };