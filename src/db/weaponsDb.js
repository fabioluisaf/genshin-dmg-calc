import { weaponsCollection } from "./dbConnect.js";
import chalk from "chalk";

async function dbGetAllWeapons() {
  return await weaponsCollection.find().toArray();
}

async function dbFindWeapon(weaponName) {
  const weapon = await weaponsCollection.findOne({ name: {$regex: weaponName, $options: 'i'} });

  return weapon;
}

async function dbFilterWeapons(filter) {
  const weapon = await weaponsCollection.find(filter).toArray();
  return weapon;
}

async function dbAllWeaponsOfType(type) {
  const weapons = await weaponsCollection.find({ type: type }).toArray();

  return weapons;
}

async function dbAddWeapon(weapon) {
  const foundWeapon = await dbFindWeapon(weapon.name);

  if (foundWeapon) {
    const str = `Weapon ${weapon.name} already in db`;
    console.log(chalk.red(str));
    return null;
  }

  const str = `Weapon ${weapon.name} successfully added in db`
  const result = await weaponsCollection.insertOne(weapon);

  console.log(chalk.green(str));

  return result;
}

async function dbUpdateWeapon(weaponName, updatedFieldName, updatedFieldVal) {
  const filter = { name: weaponName };
  const update = {
    $set: {
      [updatedFieldName]: updatedFieldVal
    }
  }
  const result = await weaponsCollection.updateOne(filter, update);

  return result;
}

async function dbDeleteWeapon(weaponName) {
  const result = await weaponsCollection.deleteOne({ name: weaponName });
  return result;
}

export {
  dbGetAllWeapons,
  dbFindWeapon,
  dbAllWeaponsOfType,
  dbAddWeapon,
  dbUpdateWeapon,
  dbDeleteWeapon,
  dbFilterWeapons
}