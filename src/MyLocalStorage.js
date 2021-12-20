/**
 * JP BEHRENS <hallo@jpbehrens.de>
 * MyLocalStorage
 */

 export class MyLocalStorage {
    _maxSize = 5 * 1024 * 1024; // 5MB => 5242880 Bytes

    constructor(){}

    // Work with primitive Datatypes

    /** 
     * @method set
     * @description - set a new key-value pair Item in the localStorage
     * @param {sting} key - set the localStorage Key
     * @param {string|number} value - set the value of the Item
     * @return {void}
     */
    set(key, value) {
        !this.has(key) ? localStorage.setItem(key, value) : null;
    }

    /** 
     * @method get
     * @description - get a  key-value pair Item from the the localStorage
     * @param {sting} key - to find the correct localStorage item
     * @return {string}
     */
    get(key) {
        return localStorage.getItem(key);
    }

    /** 
     * @method update
     * @description - update item from the the localStorage
     * @param {sting} key - to find the correct localStorage item
     * @return {void}
     */
    update(key, value) {
        this.has(key) ? localStorage.setItem(key, value) : null;
    }

    /** 
     * @method remove
     * @description - removes a localstorage Item 
     * @param {sting} key - to find the correct localStorage item
     * @return {void}
     */
    remove(key) {
        localStorage.removeItem(key);
    }

    /** 
     * @method has
     * @description - check if localStorage has Item 
     * @param {sting} key - to find the correct localStorage item
     * @return {boolean}
     */
    has(key) {
        return localStorage.getItem(key) !== null;
    }

    // Work with Arrays

    /** 
     * @method setArray
     * @description - set a Array as a localStorage Item
     * @param {sting} key - the localStorage Key
     * @param {array} array - the array to be stored
     * @return {void}
     */
    setArray(key, array) {
        if (Array.isArray(array) && !this.has(key)) {
            localStorage.setItem(key, JSON.stringify(array));
        }
    }

    /** 
     * @method getArray
     * @description - get the Array
     * @param {sting} key - the localStorage Key
     * @return {array}
     */
    getArray(key) {
        return JSON.parse(localStorage.getItem(key)) ?? [];
    }

    /** 
     * @method addToArray
     * @description - added a new Value to the Array
     * @param {sting} key - the localStorage Key
     * @param {sting|number} value - to added value
     * @return {void}
     */
    addToArray(key, value) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        array.push(value);
        if (Array.isArray(array)) {
            localStorage.setItem(key, JSON.stringify(array));
        }
    }

    /** 
     * @method removeFromArray
     * @description - remove a Value from the Array
     * @param {sting} key - the localStorage Key
     * @param {sting|number} value - to removed value
     * @return {void}
     */
    removeFromArray(key, value) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        const newArray = array.filter(a => a !== value);
        localStorage.setItem(key, JSON.stringify(newArray));
    }

    /** 
     * @method updateArray
     * @description - updates a value of the array
     * @param {sting} key - the localStorage Key
     * @param {any} oldvalue - the current index value of the array
     * @param {any} newvalue - the value with which the old index value is to be replaced
     * @return {void}
     */
    updateArray(key, oldvalue, newvalue) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        const newArray = []
        array.map(element => { element === oldvalue ? newArray.push(newvalue) : newArray.push(element) });

        if (Array.isArray(newArray)) {
            localStorage.setItem(key, JSON.stringify(newArray));
        }
    }

    /**
     * @method isIntoArray
     * @description - checks if value is present in the array
     * @param {string} key - the localStorage Key
     * @param {any} value - the value to be checked
     * @returns {boolean}  
     */
    isIntoArray(key, value) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        return array.includes(value);
    }

    // Work with Objects

    /**
    * @method setObject
    * @description - sets an object as a localstorage item
    * @param {string} key - the localStorage Key
    * @param {object} object - the object to be set
    * @returns {boolean}  
    */
    setObject(key, object) {
        // Info: Arrays and Objects have the same typeof in JS
        if (typeof object === 'object' && !Array.isArray(object) && !this.has(key)) {
            localStorage.setItem(key, JSON.stringify([object]));
        }
    }

    /**
    * @method updateObject
    * @description - sets an object as a localstorage item
    * @param {string} key - the localStorage Key
    * @param {string} attribute - the localStorage Key
    * @param {string} oldvalue - the localStorage Key
    * @returns {void}  
    */
    updateObject(key, target, targetvalue, selected = null, selectedvalue = null) {

        // Get Objects by Key
        const objects = JSON.parse(localStorage.getItem(key)) ?? [];
        // Map to the Objects
        objects.map(obj => {
            obj[target] === targetvalue && selected !== null && selectedvalue !== null
                ? obj[selected] = selectedvalue
                : obj[target] = targetvalue;

            return obj;
        });
        localStorage.setItem(key, JSON.stringify(objects));
    }


    /**
    * @method getObjects
    * @description - returns the objects wrap into an array
    * @param {string} key - the localStorage Key
    * @returns {array}  
    */
    getObjects(key) {
        return JSON.parse(localStorage.getItem(key)) ?? [];
    }

    /**
    * @method addObject
    * @description - add an Object to localStorage Item
    * @param {string} key - the localStorage Key
    * @param {object} object - the new Object 
    * @returns {void}  
    */
    addObject(key, object) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        array.push(object);
        localStorage.setItem(key, JSON.stringify(array));
    }

    /**
    * @method removeObject
    * @description - removed an Object from localStorage Item
    * @param {string} key - the localStorage Key
    * @param {string} objectKey - the key of the object to be deleted
    * @param {any} value - the value of the object key to be deleted
    * @returns {void}  
    */
    removeObject(key, objectKey, value) {
        const array = JSON.parse(localStorage.getItem(key)) ?? [];
        const newArray = array.filter(obj => obj[objectKey] !== value);
        localStorage.setItem(key, JSON.stringify(newArray));
    }

    // Storage Infos

    /**
     * @method supported
     * @description - checks if the browser supports localstorage
     * @param {string} key - the localStorage Key
     * @returns {boolean}  
     */
    supported() {
        let check = 'check';
        try {
            localStorage.setItem(check, check);
            localStorage.removeItem(check);
            return true;
        } catch (e) {
            return false;
        }
    }

    // Lists all used Keys
    getAllKeys() {
        const keys = [];
        for (let name in localStorage) {
            if (!localStorage.hasOwnProperty(name)) {
                continue;
            }
            keys.push(name);
        }
        return keys;
    }

    // Clears all localStorage from Browser
    clear() {
        localStorage.clear();
    }

    // Overview about the used and free space at the localStorage
    space() {
        const maxSpace = 5 * 1024 * 1024; // 5MB => 5242880 Bytes
        let usedSpace = 0; // 0 Bytes
        let freeSpaceInProcent;
        let freeSpaceInMB;
        let usedSpaceInMB;
        let usedSpaceInProcent;

        function format(float) {
            return parseFloat(Number(float).toFixed(6))
        }

        for (let name in localStorage) {
            if (!localStorage.hasOwnProperty(name)) {
                continue;
            }
            let size = (localStorage[name].length + name.length) * 2;
            usedSpace += size;
        }

        usedSpaceInProcent = format((usedSpace / maxSpace * 100));
        usedSpaceInMB = format(usedSpace / 1024 / 1024);

        freeSpaceInProcent = format(100 - usedSpaceInProcent);
        freeSpaceInMB = format((maxSpace - usedSpace) / 1024 / 1024);

        return {
            free: {
                mb: freeSpaceInMB,
                procent: freeSpaceInProcent
            }, used: {
                mb: usedSpaceInMB,
                procent: usedSpaceInProcent
            }
        };
    }
}