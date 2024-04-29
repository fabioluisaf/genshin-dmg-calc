function createSetFromAmbr(setAmbrData) {
  const set = {
    name: setAmbrData.name,
    setEffects: [ // affixList
      {
        name: "",
        buffs: {}
      },
    ]
  }

  return set;
}

export default createSetFromAmbr;