function buildElemPctStr(charPctDmgBonus) {
  const charElem = Object.keys(charPctDmgBonus)[0];
  const elems = [
    'electro',
    'geo',
    'pyro',
    'hydro',
    'cryo',
    'anemo',
    'dendro'
  ];

  const finalStr = elems.reduce((prevStr, elem) => {
    let str = '0';
    
    if (elem === charElem) {
      str = charPctDmgBonus[elem];
    }

    return prevStr + `, ${str}`
  }, '');

  return finalStr;
}

function buildBonusBaseAttrs(unbuffedChar) {
  const atkPct = unbuffedChar.buffList['atkPct'];
  const defPct = unbuffedChar.buffList['defPct'];
  const hpPct = unbuffedChar.buffList['hpPct'];

  const returnAtk = atkPct ? atkPct : 0;
  const returnDef = defPct ? defPct : 0;
  const returnHp = hpPct ? hpPct : 0;

  return `${returnAtk}, ${returnDef}, ${returnHp}`
}

export { buildElemPctStr, buildBonusBaseAttrs };