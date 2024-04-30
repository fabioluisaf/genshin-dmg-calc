import { ASC_VALUE, LEVEL_MULT, MULT_TIER } from "../weapon/lookupTables.js";
import { ambrWeaponSubstatDict } from "./ambrDicts.js";

const STATS = ['ATK'];
const STATS_DICT = {
  'ATK': 'atkPct',
}

function getBaseAtk(weaponAmbrData) {
  const baseAtk = weaponAmbrData.upgrade.prop[0].initValue;
  const rarity = weaponAmbrData.rank.toString();
  const tier = MULT_TIER[rarity][baseAtk.toString()];

  return baseAtk * LEVEL_MULT[rarity][tier-1] + ASC_VALUE[rarity];
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
    level: 90,
    baseAtk: getBaseAtk(weaponAmbrData),
    substat: substatName,
    substatVal: substatVal * 4.594,
    passives: [passiveObj],
  };

  return baseWeapon;
}

export default createWeaponFromAmbr;