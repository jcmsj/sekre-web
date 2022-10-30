import Dexie from 'dexie';
import { useLiveQuery } from "dexie-react-hooks";
import { useCallback } from 'react';
import { decrypt } from "./lib/cipher";
import { obscure } from './lib/cipher';
/**
 *  @typedef {{
 * id:number,
 * secret:string
 * }} Key
 * 
 * @typedef {Key & {
 * name:string
 * }} Sekre
 * 
 *  * @typedef {{
 *  targetID:"number", 
 *  keyID:"number"
 * }} KeyChain
 */

/**
 * @link {https://dexie.org/docs/Tutorial/React}
 */
export class SekreDexie extends Dexie {
    /** @type {import("dexie").Table<Sekre> */
    secrets;
    /** @type {import("dexie").Table<KeyChain>} */
    chains;
    /** @type {import("dexie").Table<Key>} */
    mainKey;
    constructor() {
        super('sekre');
        this.version(1).stores({
            secrets: '++id, name, secret',
            chains: 'targetID, keyID',
            mainKey: 'id, secret'
        });
    }
}

export const db = new SekreDexie();

/**
 * A hook for getting the main key from the database.
 */
export function useMainKey() {
    return useLiveQuery(getKey);
}

export function getKey(id=0) {
    return db.mainKey.get({ id });
}
/**
 * @param { * @param {{sekre.Sekre, key:string}} param0
 * @returns 
 */
export function tryDecrypt({sekre, key}) {
    try {
        return decrypt(sekre.secret)(key);
    } catch (error) {
        console.log(error);
        //Means the key is wrong
    }

    return "";
}

/**
 * 
 * @param {() => string} provider 
 * @returns 
 */
export function securecopy(provider) {
    return navigator.clipboard.writeText(
        provider()
    )
}

export function useAuth() {
    const mainKey = useMainKey()

    return useCallback(key => {
        return obscure(key) == mainKey.secret
    }, [mainKey])
}