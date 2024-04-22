import clamp from "./clamp.js";

const BLANK_ENEMY = {
  level: 87,
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

function allModesValid(motionValuesList, mvNames) {
  mvNames.forEach(mvName => {
    if (!Object.keys(motionValuesList).includes(mvName)) {
      throw new Error(`Couldn't find ${mvName} on list ${motionValuesList}`);
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
  const defMulDenominator = (100 + char.level) + 
                            ((100 + target.level) * (1 - defReduction) * (1 - defIgnore));

  const resistance = target.resistances[dmgElement] - resReduction;

  const enemyDefMult = defMultNumerator / defMulDenominator;
  const enemyResMult = getResMult(resistance);


  return { enemyDefMult, enemyResMult};
}

function calculateTalentDmg(
  char, 
  constelationBuffs, 
  talent, 
  talentModes = [], 
  target = BLANK_ENEMY,
  amplifying, 
  transformative
) {
  if (talentModes.length !== 0) {
    allModesValid(talent, talentModes);
  } else {
    talentModes = Object.keys(talent);
  }

  const effectiveAttrs = {
    atk: char.baseAtk + char.bonusAtk,
    def: char.baseDef + char.bonusDef,
    hp: char.baseHp + char.bonusHp,
    critRate: clamp(char.critRate, 0, 1),
  };

  const dmgPerMode = {};
  
  const avgCritMult = effectiveAttrs.critRate*(1 + char.critDmg) + 
                      (1 - effectiveAttrs.critRate);

  const ampReactionMult = amplifyingMult(amplifying);
  const transReactionFlat = transformativeBonus(transformative);

  talentModes.forEach(mode => {
    const modeTags = [...talent[mode].otherTags];
    modeTags.push(talent[mode].element);

    const scalingAttr = talent[mode].scalingAttr;
    const scalingVal = effectiveAttrs[scalingAttr] ? 
                       effectiveAttrs[scalingAttr] : 
                       char[scalingAttr];

    const baseDmgMults = 1 + getDmgModifiers(char.baseDmgMultipliers, modeTags);
    const flatBaseDmgBonus = getDmgModifiers(char.additiveBaseDmgBonus, modeTags);
    const mv = talent[mode].mv;
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

    const talentDefIgnore = talent[mode].defIgnore ? 
                            talent[mode].defIgnore : 
                            0;

    const talentDefReduction = talent[mode].defReduction ? 
                               talent[mode].defReduction : 
                               0;

    let dmgBeforeCrit;

    if (target !== BLANK_ENEMY) {
      const dmgElement = talent[mode].element;
      const resReduction = char.enemyResReduction[dmgElement];

      const defIgnore = constelationDefIgnore + talentDefIgnore;
      const defReduction = constelationDefReduction + talentDefReduction;

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
    
    dmgPerMode[mode] = {
      dmgNoCrit: dmgBeforeCrit,
      dmgOnCrit,
      avgDmg
    };
  });

  return dmgPerMode;
}

export default calculateTalentDmg;