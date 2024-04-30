import { ambrWeaponDict } from "../consume-ambr/ambrDicts.js";
import { getFullWeaponData } from "../consume-ambr/dataFromApi.js";

async function getWeaponsOfType(type) {
  const allWeapons = (await getFullWeaponData()).data.items;

  const filtered = Object.keys(allWeapons)
  .filter(weaponId => {
    const weaponType = allWeapons[weaponId].type;
    return ambrWeaponDict[weaponType] === type && 
          allWeapons[weaponId].rank > 2;
  })
  .map(weponId => {
    return {
      name: allWeapons[weponId].name
    }
  });

  return filtered;
}

export default getWeaponsOfType;