// mv = motion value

function getMvsAtLevel(baseMvs, level) {
  const mvsAtLevel = baseMvs;
  const hits = Object.keys(baseMvs);

  hits.forEach(hit => {
    const mvAtLevel = baseMvs[hit][level-1];
    mvsAtLevel[hit] = mvAtLevel;
  });

  return mvsAtLevel;
}

function setTalentAtLevel(baseTalent, leveledTalent, level) {
  const basicAtkVariations = Object.keys(baseTalent);
  basicAtkVariations.forEach(variation => {
    const baseMvs = baseTalent[variation].motionValues;
    const leveledMvs = getMvsAtLevel(baseMvs, level);

    leveledTalent[variation].motionValues = leveledMvs;
  });
}


function talentsAtLevels(baseTalent, basicAtkLevel, elementalSkillLevel, elementalBurstLevel) {
  const leveledTalents = {...baseTalent};

  setTalentAtLevel(baseTalent.basicAtk, leveledTalents.basicAtk, basicAtkLevel);
  setTalentAtLevel(baseTalent.elementalSkill, leveledTalents.elementalSkill, elementalSkillLevel);
  setTalentAtLevel(baseTalent.elementalBurst, leveledTalents.elementalBurst, elementalBurstLevel);

  return leveledTalents;
}

export default talentsAtLevels;