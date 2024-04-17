const flower = {
  artifactType: "flower",
  artifactSetName: "Marechaussee Hunter",
  artifactMainStatName: "hpFlat",
  artifactMainStatVal: 4780,
  artifactSubstatsName: ["atkFlat", "critRate", "critDmg", "er"],
  artifactSubstatsVal: [18, 0.066, 0.148, 0.155]
};

const feather = {
  artifactType: "feather",
  artifactSetName: "Marechaussee Hunter",
  artifactMainStatName: "atkFlat",
  artifactMainStatVal: 311,
  artifactSubstatsName: ["defPct", "critDmg", "em", "critRate"],
  artifactSubstatsVal: [0.117, 0.194, 23, 0.078]
};

const sands = {
  artifactType: "sands",
  artifactSetName: "Marechaussee Hunter",
  artifactMainStatName: "atkPct",
  artifactMainStatVal: 0.466,
  artifactSubstatsName: ["atkFlat", "critDmg", "defFlat", "critRate"],
  artifactSubstatsVal: [58, 0.194, 19, 0.031]
};

const goblet = {
  artifactType: "goblet",
  artifactSetName: "Wanderer's Troupe",
  artifactMainStatName: "pyroDmgBonus",
  artifactMainStatVal: 0.466,
  artifactSubstatsName: ["critRate", "hpFlat", "critDmg", "atkPct"],
  artifactSubstatsVal: [0.109, 836, 0.07, 0.058]
};

const circlet = {
  artifactType: "circlet",
  artifactSetName: "Marechaussee Hunter",
  artifactMainStatName: "critDmg",
  artifactMainStatVal: 0.622,
  artifactSubstatsName: ["critRate", "defFlat", "atkFlat", "hpFlat"],
  artifactSubstatsVal: [0.132, 44, 19, 269]
};

const artifactPieces = [flower, feather, sands, goblet, circlet];

export default artifactPieces;