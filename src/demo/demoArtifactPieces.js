const flower = {
  artifactType: "flower",
  artifactSetName: "Marechaussee Hunter",
  stats: {
    hpFlat: 4780,
    atkFlat: 18,
    critRate: 0.066,
    critDmg: 0.148,
    energyRecharge: 0.155
  }
};

const feather = {
  artifactType: "feather",
  artifactSetName: "Marechaussee Hunter",
  stats: {
    atkFlat: 311,
    defPct: 0.117,
    critDmg: 0.194,
    elementalMastery: 23,
    critRate: 0.078
  }
};

const sands = {
  artifactType: "sands",
  artifactSetName: "Marechaussee Hunter",
  stats: {
    atkPct: 0.466,
    atkFlat: 58,
    critDmg: 0.194,
    defFlat: 19,
    critRate: 0.031
  }
};

const goblet = {
  artifactType: "goblet",
  // artifactSetName: "Wanderer's Troupe",
  artifactSetName: "Marechaussee Hunter",
  stats: {
    pyroDmgBonus: 0.466,
    critRate: 0.109,
    hpFlat: 836,
    critDmg: 0.07,
    atkPct: 0.058
  }
};

const circlet = {
  artifactType: "circlet",
  artifactSetName: "Marechaussee Hunter",
  stats: {
    critDmg: 0.622,
    critRate: 0.132,
    defFlat: 44,
    atkFlat: 19,
    hpFlat: 269
  }
};

const artifactPieces = [flower, feather, sands, goblet, circlet];

export default artifactPieces;