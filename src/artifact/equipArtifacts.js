import { applyBuffToChar } from "../character/utils/applyBuffToChar.js";
import { getEquippedArtifactSetsList } from "./artifactUtils.js";

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
  const artifactVariationsEquiped = getEquippedArtifactSetsList(artifactPieces, buffVariationName);
  
  artifactVariationsEquiped.forEach(set => {
    char.equipedArtifactSets.push(set.artifactSetName);
    
    set.passive.attrNames.forEach((attrName, index) =>{
      const buffVal = set.passive.attrValues[index];
      applyBuffToChar(char, attrName, buffVal);
    });
  });

  artifactPieces.forEach(piece => equipPiece(char, piece));
}

export { equipArtifacts };