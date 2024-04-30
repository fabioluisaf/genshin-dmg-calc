// mv = motion value

function setTalentAtLevel(baseTalent, leveledTalent, level) {
  const talentModes = Object.keys(baseTalent);
  talentModes.forEach(mode => {
    const leveledMv = baseTalent[mode].mv[level-1];

    leveledTalent[mode].mv = leveledMv;
  });
}


function talentsAtLevels(baseTalents, basicAtkLevel, elementalSkillLevel, elementalBurstLevel) {
  const leveledTalents = {...baseTalents};

  setTalentAtLevel(baseTalents['basic attack'], leveledTalents['basic attack'], basicAtkLevel);
  setTalentAtLevel(baseTalents['elemental skill'], leveledTalents['elemental skill'], elementalSkillLevel);
  setTalentAtLevel(baseTalents['elemental burst'], leveledTalents['elemental burst'], elementalBurstLevel);

  return leveledTalents;
}

export default talentsAtLevels;