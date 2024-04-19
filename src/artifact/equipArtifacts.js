import addToBuffList from "../character/buffs/addToBuffList.js";
import { getEquippedArtifactSetsList } from "./artifactUtils.js";

function equipPiece(char, artifactPiece) {
  const artifactStatNames = Object.keys(artifactPiece.stats);

  artifactStatNames.forEach(statName => {
    addToBuffList(char, statName, artifactPiece.stats[statName]);
  });
}

function equipArtifacts(char, artifactPieces, buffVariationName) {
  const artifactVariationsEquiped = getEquippedArtifactSetsList(artifactPieces, buffVariationName);
  
  artifactVariationsEquiped.forEach(set => {
    char.equipedArtifactSets.push(set.artifactSetName);
    
    Object.keys(set.setEffects).forEach(attrName => {
      addToBuffList(char, attrName, set.setEffects[attrName]);
    });
  });

  artifactPieces.forEach(piece => equipPiece(char, piece));
}

export { equipArtifacts };