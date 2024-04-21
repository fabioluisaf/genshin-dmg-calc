

const capturePcts = /(\d\d)(\.(\d\d?))?%/;
const pctsToNum = /.$1$3,/;
const captureSmallerThanOne = /(?<!\d)(\.\d)/;
const addZeroAhead = /0$1/;