const BUFFNAME_TO_BUFFTAG = {
  normalAtkPct: "normalAtk",
  chargedAtkPct: "chargedAtk",
  pyroDmgBonus: "pyro",
  hydroDmgBonus: "hydro",
  physicalDmgBonus: "physical",
  electroDmgBonus: "electro",
  geoDmgBonus: "geo",
  dendroDmgBonus: "dendro",
  anemoDmgBonus: "anemo",
  cryoDmgBonus: "cryo",
}

function applyDmgBonusPct(char, attr, val) {
  const buffTag = BUFFNAME_TO_BUFFTAG[attr];

  if (!Object.keys(char.pctDmgBonus).includes(buffTag)) {
    char.pctDmgBonus[buffTag] = 0;
  }

  char.pctDmgBonus[buffTag] += val;
}

function removeDmgBonusPct(char, attr, val) {
  if (!Object.keys(char.pctDmgBonus).includes(attr)) {
    throw new Error(`Character doesn't have the dmb% bonus called ${attr}, check for possible mistakes`);
  }

  char.pctDmgBonus[attr] -= val;
}

export { applyDmgBonusPct, removeDmgBonusPct };