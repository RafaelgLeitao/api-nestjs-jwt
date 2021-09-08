const base64Url = require('base64-url');

const header = {
    alg: 'HS256', //Hmac + sha256
    typ: 'JWT'
};

//corpo de dados - dados principais do token
const payload = {
    username: 'rleitao@leucotron.com.br',
    name: 'Rafael Leitao',
    exp: new Date().getTime(), //timestamp
};

const key = 'abcd123456';

const headerEncoded = base64Url.encode(JSON.stringify(header));
const payloadEncoded = base64Url.encode(JSON.stringify(payload));

console.log(headerEncoded,  ' ' + payloadEncoded);

const crypt = require('crypto');

const singnature = crypt.createHmac('sha256', key)
.update(`${headerEncoded}.${payloadEncoded}`)
.digest('bin');



console.log(`${headerEncoded}.${payloadEncoded}.${base64Url.encode(singnature)}`);