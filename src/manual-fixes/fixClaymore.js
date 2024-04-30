const FUNCTION_DICT = {
  'Wolf\'s Gravestone': fixWGS,
}

function fixWGS(wgs) {
  wgs.passives = [
    {
      name: 'Passive Down',
      buffs: {
        atkPct: [0.2, 0.25, 0.3, 0.35, 0.4],
      }
    },
    {
      name: 'Passive Up',
      buffs: {
        atkPct: [0.6, 0.75, 0.9, 1.05, 1.2],
      },
    },
  ];
}

function fixClaymore(weapon) {
  const fixFunction = FUNCTION_DICT[weapon.name];

  return fixFunction(weapon);
}

export default fixClaymore;