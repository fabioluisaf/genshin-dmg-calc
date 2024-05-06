import clamp from "./utils/clamp.js";

const BLANK_ENEMY = {
  name: "No enemy",
  level: 90,
  pctDmgReduction: {},
  resistances: {
    physical: 0,
    pyro: 0,
    dendro: 0,
    hydro: 0,
    electro: 0,
    anemo: 0,
    cryo: 0,
    geo: 0,
  },
};

function getDmgModifiers(dmgModifierList, dmgTags) {
  let dmgBonus = 0;

  dmgTags.forEach(tag => {
    dmgBonus += dmgModifierList[tag] ? dmgModifierList[tag] : 0;
  });

  return dmgBonus;
}

function amplifyingMult(reactionName) {
  return 1;
}

function getResMult(baseResistance) {
  if (baseResistance < 0) {
    return 1 - (baseResistance/2);
  } else if (baseResistance < 0.75) {
    return 1 - baseResistance;
  } else {
    return 1 / (1 + (4 * baseResistance));
  }
}

function getEnemyMults(target, char, dmgElement) {
  const defReduction = char.enemyDefReduction;
  const defIgnore = char.enemyDefIgnore;
  const resReduction = char.enemyResReduction[dmgElement];

  const defMultNumerator = 100 + char.level;
  const defMultDenominator = (100 + char.level) + 
                            ((100 + target.level) * (1 - defReduction) * (1 - defIgnore));

  const resistance = target.resistances[dmgElement] - resReduction;

  const enemyDefMult = defMultNumerator / defMultDenominator;
  const enemyResMult = getResMult(resistance);


  return { enemyDefMult, enemyResMult};
}

// WARNING: Currently doesn't take into consideration
// defense reduction/ignore from pasive talents
function calculateTalentDmg(char, talent, reaction = '', target = BLANK_ENEMY) {
  const effectiveAttrs = {
    atk: char.baseAtk + char.bonusAtk,
    def: char.baseDef + char.bonusDef,
    hp: char.baseHp + char.bonusHp,
    critRate: clamp(char.critRate, 0, 1),
  };

  const dmgPerMode = {};
  const avgCritMult = 1 + effectiveAttrs.critRate*char.critDmg;
  const ampReactionMult = amplifyingMult(reaction);

  talent = talent.filter(mode => mode.mainTag === 'dmg');

  talent.forEach(talentMode => {
    const modeName = talentMode.name;
    const modeTags = [...talentMode.otherTags];
    modeTags.push(talentMode.element);
    modeTags.push(talentMode.mainTag);

    const scalingVal = effectiveAttrs[talentMode.scalingAttr] ? effectiveAttrs[talentMode.scalingAttr] : char[talentMode.scalingAttr];

    const baseDmgMults = 1 + getDmgModifiers(char.baseDmgMultipliers, modeTags);
    const flatBaseDmgBonus = getDmgModifiers(char.additiveBaseDmgBonus, modeTags);
    const mv = talentMode.mv;
    
    const effectiveBaseDmg = (mv * scalingVal * baseDmgMults) + flatBaseDmgBonus;

    const dmgBonus = getDmgModifiers(char.pctDmgBonus, modeTags);
    const targetDmgReduction = getDmgModifiers(target.pctDmgReduction, modeTags);
    const effectiveDmgBonus = 1 + dmgBonus - targetDmgReduction;

    const { enemyDefMult, enemyResMult } = getEnemyMults(target, char, talentMode.element);

    let dmgBeforeCrit = effectiveBaseDmg * effectiveDmgBonus * ampReactionMult;

    if (target !== BLANK_ENEMY) {
      dmgBeforeCrit *= enemyDefMult * enemyResMult;
    }

    dmgPerMode[modeName] = {
      target: target.name,
      dmgNoCrit: dmgBeforeCrit,
      dmgOnCrit: dmgBeforeCrit * (1 + char.critDmg),
      avgDmg: dmgBeforeCrit * avgCritMult,
    };
  });

  return dmgPerMode;
}

export default calculateTalentDmg;