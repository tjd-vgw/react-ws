/**
 * A simple map built on associative arrays,
 * numeric keys are converted to strings
 * @type {Map}
 */
export class PokerMap<T> {
    private holder;
    length : number;

    constructor() {
        this.holder = {};
        this.length = 0;
    }

    /**
     * Retrieves the number of elements the Map
     * @return {Number}
     */
    size() {
        return this.length;
    }
    /**
     *
     * @param key
     * @return {*}
     * @private
     */
    // @ts-ignore
    _key(key) {
        if(key===undefined) {
            console.warn("Key was undefined ", new Error());
            throw "Key must not be undefined";
        } else if(typeof(key)=="number")  {
            return ""+key;
        } else {
            return key;
        }
    }
    /**
     * Puts/replaces a value in the map with the specific key
     * @param key
     * @param val
     * @return {Object} if there already was an object associated to the key
     * it will be returned otherwise null
     */
    // @ts-ignore
    put(key,val : T) {
        key = this._key(key);
        var existing = null;
        // @ts-ignore
        if(this.holder[key]!==undefined) {
            // @ts-ignore
            existing = this.holder[key];
        }
        // @ts-ignore
        this.holder[key] = val;

        if(existing==null) {
            this.length++;
        }


        return existing;
    }
    /**
     * Get a values by its key, null if no values are associated with the specified key
     * @param key - key of the value to return
     * @return {Object}
     */
    // @ts-ignore
    get(key)  : T {
        key = this._key(key);
        // @ts-ignore
        if(this.holder[key]!==undefined) {
            // @ts-ignore
            return this.holder[key];
        } else {
            // @ts-ignore
            return null;
        }
    }
    /**
     * Removes and returns a values associated to the supplied key,
     * null if there was no value with
     * @param key
     * @return {Object}
     */
    // @ts-ignore
    remove(key) : T {
        key = this._key(key);
        if(key!==undefined) {
            // @ts-ignore
            if(this.holder[key]!==undefined) {
                // @ts-ignore
                var val = this.holder[key];
                // @ts-ignore
                delete this.holder[key];
                this.length--;
                return val;
            }
        }
        // @ts-ignore
        return null;

    }
    /**
     * Get an array of the values in this map
     * @return {Array}
     */
    values() :  T[]{
        var values = new Array();
        for(var v in this.holder) {
            // @ts-ignore
            values.push(this.holder[v]);
        }
        return values;
    }
    /**
     * Gets the keys of the values as an array
     * @return {Array}
     */
    keys() {
        var keys = new Array();
        for(var v in this.holder) {
            keys.push(v);
        }
        return keys;
    }
}