import https from 'https';
import createCharFromAmbr from './char/createCharFromAmbr.js';

// /v2/en/avatar?vh=46F0 <- path for getting all characters
// /v2/en/avatar/{id}?vh=46F0 <- path for getting specific character, swap {id} for the character id

function doApiRequest(resource) {
  const options = {
    hostname: 'api.ambr.top',
    path: resource,
    method: 'GET',
  };

  return new Promise((resolve, reject) => {
    let fullRes = "";

    const req = https.request(options, (res) => {
      res.on('data', (resBuffer) => {
        const resStr = resBuffer.toString();
        fullRes += resStr;
      });
      
      res.on('end', () => {
        const JSONRes = JSON.parse(fullRes);
        resolve(JSONRes);
      });
    });
    
    req.on('error', (e) => {
      reject(new Error(e));
    });
    req.end();
  });
}

async function getAllCharacterIds() {
  const JSONRes = await doApiRequest('/v2/en/avatar?vh=46F0');
  const namesAndIds = [];

  (Object.keys(JSONRes.data.items)).forEach(charId => {
    namesAndIds.push({
      id: JSONRes.data.items[charId].id.toString(),
      name: JSONRes.data.items[charId].route,
    });
  });

  return namesAndIds;
}

async function consumeAmbrApi() {
  const allChars = await getAllCharacterIds();
  const desiredId = allChars.filter(char => char.name === 'Yoimiya')[0].id;

  const charAmbrData = (await doApiRequest(`/v2/en/avatar/${desiredId}?vh=46F0`)).data;

  return charAmbrData;
}

export default consumeAmbrApi;