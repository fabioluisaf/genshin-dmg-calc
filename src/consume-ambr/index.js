import https from 'https';
import createCharFromAmbr from './createCharFromAmbr.js';

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
  return Object.keys(JSONRes.data.items);
}

async function consumeAmbrApi() {
  const charIds = await getAllCharacterIds();
  const charAmbrData = (await doApiRequest(`/v2/en/avatar/${charIds[0]}?vh=46F0`)).data;
  const baseChar = createCharFromAmbr(charAmbrData);

  console.log(baseChar);
}

export default consumeAmbrApi;