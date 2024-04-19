
const marechaussee = {
  artifactSetName: "Marechaussee Hunter",
  passive: {
    attrNames: ["normalAtkPct", "chargedAtkPct", "critRate"],
    fourPcsThreeStacks: {
      variationName: "4pcs (3 stacks)",
      threshold: 4,
      attrValues: [0.15, 0.15, 0.36]
    },
    fourPcsTwoStacks: {
      variationName: "4pcs (2 stacks)",
      threshold: 4,
      attrValues: [0.15, 0.15, 0.24]
    },
    fourPcsOneStack: {
      variationName: "4pcs (1 stack)",
      threshold: 4,
      attrValues: [0.15, 0.15, 0.12]
    },
    fourPcsNoStacks: {
      variationName: "4pcs (0 stacks)",
      threshold: 4,
      attrValues: [0.15, 0.15, 0]
    },
    twoPcs: {
      variationName: "2pcs",
      threshold: 2,
      attrValues: [0.15, 0.15, 0]
    }
  }
};

export default marechaussee;