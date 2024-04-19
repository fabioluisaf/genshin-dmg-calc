function applyDmgBonusPct(char, attr, val) {
  if (!Object.keys(char.pctDmgBonus).includes(attr)) {
    char.pctDmgBonus[attr] = 0;
  }

  char.pctDmgBonus[attr] += val;
}

function removeDmgBonusPct(char, attr, val) {
  if (!Object.keys(char.pctDmgBonus).includes(attr)) {
    throw new Error(`Character doesn't have the dmb% bonus called ${attr}, check for possible mistakes`);
  }

  char.pctDmgBonus[attr] -= val;
}

export { applyDmgBonusPct, removeDmgBonusPct };