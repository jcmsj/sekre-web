import Dexie from 'dexie';

/**
 * @typedef {{
 *  id?:number,
 * name:string,
 * secret:string,
 * }} Sekre
 */

/**
 * @link {https://dexie.org/docs/Tutorial/React}
 */
export class SekreDexie extends Dexie {
    /** @type {import("dexie").Table<Sekre> */
    secrets;
    constructor() {
        super('sekre');
        this.version(1).stores({
            secrets: '++id, name, secret',
        });
    }
}

export const db = new SekreDexie();