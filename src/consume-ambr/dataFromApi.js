import doApiRequest from './doApiRequest.js';

async function getIdsAndNames(resource, getFullData) {
  const res = (await doApiRequest(`/v2/en/${resource}`));
  
  if (getFullData) {
    return res;
  }

  const resItems = res.data.items;
  const namesAndIds = [];

  (Object.keys(resItems)).forEach(charId => {
    namesAndIds.push({
      id: resItems[charId].id.toString(),
      name: resItems[charId].route,
    });
  });

  return namesAndIds;
}

async function getData(resourceType, queryParam, name, getFullData = false) {
  const allItems = await getIdsAndNames(`${resourceType}?${queryParam}`, getFullData);
  
  if (name) {
    const filteredItems = allItems.filter(item => item.name.match(new RegExp(name, 'i')));
    if (filteredItems.length === 0) throw new Error(`Char named '${name}' not found.`);

    const desiredId = filteredItems[0].id;

    const ambrData = (await doApiRequest(`/v2/en/${resourceType}/${desiredId}?${queryParam}`)).data;
  
    return ambrData;
  }

  return allItems;
}

async function getCharData(charName) {
  return getData('avatar', 'vh=46F0', charName);
}

async function getWeaponData(weaponName) {
  return getData('weapon', 'vh=46F3', weaponName);
}

async function getFullCharData() {
  return getData('avatar', 'vh=46F0', undefined, true);
}

async function getFullWeaponData() {
  return getData('weapon', 'vh=46F3', undefined, true);
}

export { 
  getCharData, 
  getWeaponData, 
  getFullCharData, 
  getFullWeaponData, 
};

// avatar?vh=46F0    <- all characters
// weapon?vh=46F3    <- all weapons