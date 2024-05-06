import addBuff from "./character/buffs/addBuff.js";
import applyVariableBuff from "./character/buffs/variableBuff.js";
import buildLeveledChar from "./character/buildLeveledChar.js";
import talentsAtLevels from "./character/leveling/talentsAtLevels.js";
import createCharFromAmbr from "./consume-ambr/createCharFromAmbr.js";
import { getCharData } from "./consume-ambr/dataFromApi.js";
import createTalentsFromAmbr from "./consume-ambr/talents/createTalentsFromAmbr.js";
import { client } from "./db/dbConnect.js";
import { dbAllWeaponsOfType } from "./db/weaponsDb.js";
import calculateTalentDmg from "./dmg/calculateDmg.js";
import equipWeapon from "./weapon/equipWeapon.js";

const CHAR_NAME = 'albedo';
const TALENT = 'elemental skill';
const MODE = 'Transient Blossom DMG';

const EXCLUDED_WEAPONS = ['Splendor of Tranquil Waters (2/3 stacks)', 'Mistsplitter Reforged R1 (3 stacks)'];

const charAmbrData = await getCharData(CHAR_NAME);

const charBaseTalents = createTalentsFromAmbr(charAmbrData);
const baseChar = createCharFromAmbr(charAmbrData);

const allWeapons = await dbAllWeaponsOfType(baseChar.weaponType);

const leveledChar = buildLeveledChar(baseChar, 80);
const leveledTalents = talentsAtLevels(charBaseTalents, 1, 9, 1);

addBuff(leveledChar, 'critRate', 0.478);
addBuff(leveledChar, 'critDmg', 0.396);
addBuff(leveledChar, 'defFlat', 1013);
addBuff(leveledChar, 'defFlat', 1013);
addBuff(leveledChar, 'geoDmgbonus', 0.466);
addBuff(leveledChar, 'defPct', 0.3);

const dmg = allWeapons.map(weapon => {
  if (!EXCLUDED_WEAPONS.includes(weapon.name)) {
    const res = {
      weapon: weapon.name,
      dmg: 0,
    };
    
    const charWithWeapon = equipWeapon(leveledChar, weapon);
    applyVariableBuff(charWithWeapon, weapon.variableStats);

    const dmg = calculateTalentDmg(charWithWeapon, leveledTalents[TALENT]);
    res.dmg = dmg[MODE].avgDmg;

    return res;
  }
});

dmg.sort((weaponA, weaponB) => {
  if (weaponA.dmg > weaponB.dmg) {
    return 1;
  } else if (weaponA.dmg < weaponB.dmg) {
    return -1;
  } else {
    return 0;
  }
});

console.log(dmg);

client.close();