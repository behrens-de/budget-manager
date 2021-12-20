import { MyLocalStorage } from './MyLocalStorage';
const storage = new MyLocalStorage;



export class List {
    _storage_name = 'lists';
    // ADD LIST
    add({ name = "unbekannt", id = 0 } = {}) {
        storage.addObject(this._storage_name, {
            id,
            name
        })
    }
}

