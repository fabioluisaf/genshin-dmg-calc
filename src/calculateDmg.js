import clamp from "./clamp.js";

const BLANK_ENEMY = {
  name: "No enemy",
  // level: 87,
  // pctDmgReduction: {},
  // resistances: {
  //   physical: 0,
  //   pyro: 0,
  //   dendro: 0,
  //   hydro: 0,
  //   electro: 0,
  //   anemo: 0,
  //   cryo: 0,
  //   geo: 0,
  // },
};

function allModesValid(modeList, modeNames) {
  const allModeNames = modeList.map(mode => {
    return mode.name;
  });

  modeNames.forEach(name => {
    if (!allModeNames.includes(name)) {
      throw new Error(`Couldn't find ${name} on list ${allModeNames}`);
    }
  });
}

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

function transformativeBonus(reactionName) {
  return 0;
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

function getEnemyMults(target, char, defReduction, defIgnore, resReduction, dmgElement) {
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
function calculateTalentDmg(
  char, 
  constelationBuffs, 
  talent, 
  talentModeNames = [], 
  target = BLANK_ENEMY,
  amplifying, 
  transformative
) {
  if (talentModeNames.length !== 0) {
    allModesValid(talent, talentModeNames);
  } else {
    talentModeNames = talent.map(mode => {
      return mode.name;
    });
  }

  const effectiveAttrs = {
    atk: char.baseAtk + char.bonusAtk,
    def: char.baseDef + char.bonusDef,
    hp: char.baseHp + char.bonusHp,
    critRate: clamp(char.critRate, 0, 1),
  };

  const dmgPerMode = {};
  
  const avgCritMult = 1 + effectiveAttrs.critRate*char.critDmg;

  const ampReactionMult = amplifyingMult(amplifying);
  const transReactionFlat = transformativeBonus(transformative);

  talentModeNames.forEach(modeName => {
    const talentMode = talent.filter(mode => {
      return mode.name === modeName;
    })[0];

    const modeTags = [...talentMode.otherTags];
    modeTags.push(talentMode.element);
    modeTags.push(talentMode.mainTag);

    const scalingAttr = talentMode.scalingAttr;
    const scalingVal = effectiveAttrs[scalingAttr] ? 
                       effectiveAttrs[scalingAttr] : 
                       char[scalingAttr];

    const baseDmgMults = 1 + getDmgModifiers(char.baseDmgMultipliers, modeTags);
    const flatBaseDmgBonus = getDmgModifiers(char.additiveBaseDmgBonus, modeTags);
    const mv = talentMode.mv;

    // console.log(`scalingAttr: ${scalingAttr}`);

    const effectiveBaseDmg = (mv * scalingVal * baseDmgMults) + flatBaseDmgBonus;

    const dmgBonus = getDmgModifiers(char.pctDmgBonus, modeTags);
    const targetDmgReduction = getDmgModifiers(target.pctDmgReduction, modeTags);
    const effectiveDmgBonus = 1 + dmgBonus - targetDmgReduction;

    const constelationDefIgnore = constelationBuffs.defIgnore ? 
                                  constelationBuffs.defIgnore : 
                                  0;

    const constelationDefReduction = constelationBuffs.defReduction ? 
                                     constelationBuffs.defReduction : 
                                     0;

    let dmgBeforeCrit;

    if (target !== BLANK_ENEMY) {
      const dmgElement = talentMode.element;
      const resReduction = char.enemyResReduction[dmgElement];

      const defIgnore = constelationDefIgnore;
      const defReduction = constelationDefReduction;

      const { enemyDefMult, enemyResMult } = getEnemyMults(
        target, char, defReduction, 
        defIgnore, resReduction, dmgElement
      );

      dmgBeforeCrit = (
        effectiveBaseDmg * 
        effectiveDmgBonus * 
        enemyDefMult * 
        enemyResMult * 
        ampReactionMult
      ) + transReactionFlat;
    } else {
      dmgBeforeCrit = (
        effectiveBaseDmg * 
        effectiveDmgBonus * 
        ampReactionMult
      ) + transReactionFlat;
    }

    const dmgOnCrit = dmgBeforeCrit * (1 + char.critDmg);
    const avgDmg = dmgBeforeCrit * avgCritMult;
    
    dmgPerMode[modeName] = {
      target: target.name,
      dmgNoCrit: dmgBeforeCrit,
      dmgOnCrit,
      avgDmg,
    };
  });

  return dmgPerMode;
}

export default calculateTalentDmg;