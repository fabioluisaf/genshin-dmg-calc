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

  setTalentAtLevel(baseTalents.basicAtk, leveledTalents.basicAtk, basicAtkLevel);
  setTalentAtLevel(baseTalents.elementalSkill, leveledTalents.elementalSkill, elementalSkillLevel);
  setTalentAtLevel(baseTalents.elementalBurst, leveledTalents.elementalBurst, elementalBurstLevel);

  return leveledTalents;
}

export default talentsAtLevels;