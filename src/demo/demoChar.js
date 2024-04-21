const gamingBase = {
  charName: "Gaming",
  rarity: 4,
  baseHp: 957.38055419922,
  baseAtk: 25.287359237671,
  baseDef: 58.941749572754,
  maxAscensionHp: 3425.4904785156,
  maxAscensionAtk: 90.479843139648,
  maxAscensionDef: 210.89250183105,
  bonusAttrName: "atkPct",
  element: "pyro",
  weaponType: "claymore"
};

const gamingBaseTalents = {
  basicAtk: {
    naHit1: {
      mv: [0.8386, 0.9068, 0.9751, 1.0726, 1.1408, 1.2188, 1.3261, 1.4334, 1.5406, 1.6576, 1.7746, 1.8916, 2.0086, 2.1257, 2.2427],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "normalAtk"],
    },
    naHit2: {
      mv: [0.7904, 0.8548, 0.9191, 1.011, 1.0754, 1.1489, 1.25, 1.3511, 1.4522, 1.5625, 1.6728, 1.7831, 1.8934, 2.0037, 2.114],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "normalAtk"],
    },
    naHit3: {
      mv: [1.0665, 1.1533, 1.2401, 1.3641, 1.4509, 1.5501, 1.6865, 1.8229, 1.9593, 2.1081, 2.2569, 2.4057, 2.5545, 2.7034, 2.8522],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "normalAtk"],
    },
    naHit4: {
      mv: [1.2795, 1.3836, 1.4878, 1.6366, 1.7407, 1.8597, 2.0234, 2.187, 2.3507, 2.5292, 2.7078, 2.8863, 3.0648, 3.2434, 3.4219],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "normalAtk"],
    },
    caCyclicDmg: {
      mv: [0.6252, 0.6761, 0.727, 0.7997, 0.8506, 0.9087, 0.9887, 1.0687, 1.1487, 1.2359, 1.3231, 1.4104, 1.4976, 1.5849, 1.6721],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "chargedAtk"],
      maxDuration: 5, // seconds
    },
    caFinalDmg: {
      mv: [1.1309, 1.2229, 1.315, 1.4465, 1.5386, 1.6437, 1.7884, 1.9331, 2.0777, 2.2355, 2.3933, 2.5511, 2.7089, 2.8667, 3.0245],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "chargedAtk"]
    },
    plunge: {
      mv: [0.6415, 0.6937, 0.7459, 0.8205, 0.8727, 0.9323, 1.0144, 1.0964, 1.1785, 1.268, 1.3575, 1.447, 1.5365, 1.626, 1.7155],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "plunge"]
    },
    lowPlunge: {
      mv: [1.2826, 1.387, 1.4914, 1.6406, 1.745, 1.8643, 2.0284, 2.1924, 2.3565, 2.5354, 2.7144, 2.8934, 3.0724, 3.2513, 3.4303],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "plunge"]
    },
    highPlunge: {
      mv: [1.6021, 1.7325, 1.8629, 2.0492, 2.1796, 2.3286, 2.5335, 2.7384, 2.9434, 3.1669, 3.3905, 3.614, 3.8376, 4.0611, 4.2846],
      scalingAttr: "atk",
      element: "physical",
      otherTags: ["attack", "plunge"]
    }
  },
  elementalSkill: {
    plungeDmg: {
      mv: [2.304, 2.4768, 2.6496, 2.88, 3.0528, 3.2256, 3.456, 3.6864, 3.9168, 4.1472, 4.3776, 4.608, 4.896, 5.184, 5.472],
      scalingAttr: "atk",
      element: "pyro",
      otherTags: ["attack", "plunge", "charmedCloudstrider"]
    }
  },
  elementalBurst: {
    ManChaiDmg: {
      mv: [3.704, 3.9818, 4.2596, 4.63, 4.9078, 5.1856, 5.556, 5.9264, 6.2968, 6.6672, 7.0376, 7.408, 7.871, 8.334, 8.797],
      scalingAttr: "atk",
      element: "pyro",
      otherTags: ["attack", "elementalBurst"]
    }
  }
};

const gamingPassiveTalents = {
  a4: {
    talentName: "Talent: Air of Prosperity",
    charmedCloudstrider: 0.2,
  }
}

export { gamingBase, gamingBaseTalents, gamingPassiveTalents };