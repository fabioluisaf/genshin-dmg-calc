
const marechaussee = {
  artifactSetName: "Marechaussee Hunter",
  artifactBuffThresholds: [2, 4],
  passive: {
    attrNames: [["normalAtkPct", "chargedAtkPct"], ["critRate"]],
    oneStack: {
      variationName: " 1 stack",
      attrValues: [[0.15, 0.15], [0.12]]
    },
    twoStacks: {
      variationName: " 2 stacks",
      attrValues: [[0.15, 0.15], [0.24]]
    },
    threeStacks: {
      variationname: " 3 stacks",
      attrValues: [[0.15, 0.15], [0.36]]
    }
  }
};

export default marechaussee;