import https from 'https';

// /v2/en/avatar?vh=46F0 <- path for getting all characters
// /v2/en/avatar/{id}?vh=46F0 <- path for getting specific character, swap {id} for the character id

export function doApiRequest(path) {
  const options = {
    hostname: 'api.ambr.top',
    path: path,
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

export default doApiRequest;