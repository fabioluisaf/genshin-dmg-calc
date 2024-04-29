import { ambrWeaponSubstatDict } from "./ambrDicts.js";

const STATS = ['ATK'];
const STATS_DICT = {
  'ATK': 'atkPct',
}

function getBaseAtk(weaponAmbrData) {
  return weaponAmbrData.upgrade.prop[0].initValue;
}

function getSubstat(weaponAmbrData) {
  const ambrName = weaponAmbrData.upgrade.prop[1].propType;
  const name = ambrWeaponSubstatDict[ambrName];
  const val = weaponAmbrData.upgrade.prop[1].initValue;

  return [name, val];
}

function lookForStats(description) {
  const statsFound = {};

  STATS.forEach(stat => {
    const regex = new RegExp(`(${stat}).+? <color=#.+?>(\\d+)(%?)`);
    const match = description.match(regex);

    const isPct = match[3] === '%';
    const statName = STATS_DICT[match[1]];
    const statVal = isPct ? Number(match[2])/100 : Number(match[2]);
    
    statsFound[statName] = statVal;
  });

  return statsFound;
}

function appendStats(passive, stats, refLvl) {
  (Object.keys(stats)).forEach(stat => {
    if(!passive[stat]) {
      passive[stat] = [];
    }
    const index = Number(refLvl);
    passive[stat][index] = stats[stat];
  });
}

function getPassive(weaponAmbrData) {
  const passive = {};
  const affixId = '1' + weaponAmbrData.storyId;

  Object.keys(weaponAmbrData.affix[affixId].upgrade).forEach(refLvl => {
    const description = weaponAmbrData.affix[affixId].upgrade[refLvl];
    const stats = lookForStats(description);
    
    appendStats(passive, stats, refLvl);
  });

  return passive;
}

function createWeaponFromAmbr(weaponAmbrData) {
  const [substatName, substatVal] = getSubstat(weaponAmbrData);
  const passiveObj = {
    name: "",
    buffs: getPassive(weaponAmbrData),
  }

  const baseWeapon = {
    name: weaponAmbrData.route,
    type: weaponAmbrData.type.toLowerCase(),
    rarity: weaponAmbrData.rank,
    level: 1,
    baseAtk: getBaseAtk(weaponAmbrData),
    substat: substatName,
    substatVal: substatVal,
    passives: [passiveObj],
  };

  return baseWeapon;
}

export default createWeaponFromAmbr;