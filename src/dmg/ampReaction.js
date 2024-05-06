const REACTION_MULT = {
  'melt': 2,
  'rev melt': 1.5,
  'vape': 2,
  'rev vape': 1.5
}

function amplifyingMult(char, reactionName) {
  if (reactionName === '') {
    return 1;
  }

  const reactionBonus = char.reactionBonus[reactionName] ? char.reactionBonus[reactionName] : 0;
  const emMult = 1 + (2.78 * char.elementalMastery)/(1400 + char.elementalMastery) + reactionBonus
  
  return REACTION_MULT[reactionName] * emMult
}

export default amplifyingMult;