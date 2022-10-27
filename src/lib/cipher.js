import { AES, enc, SHA256 } from "crypto-js"

/**
 * @typedef {{name:string, secret:string}} Credential
 * @typedef {{id:string} & Credential} StoredSekre
 * @typedef {{key:string} & Credential} VisibleSekre
 */

export const decrypt = cipher => key => AES.decrypt(cipher, key).toString(enc.Utf8);
export const encrypt = secret => key => AES.encrypt(secret, key).toString();

/**
 * @param {string} key 
 */
 export const obscure = key => SHA256(key).toString();