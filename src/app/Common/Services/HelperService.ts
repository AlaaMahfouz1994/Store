import { Injectable } from '@angular/core';
import { RoleEnum } from '../Enums/Role.Enum';
import { StorageEnum } from '../Enums/Storage.Enum';


@Injectable({ providedIn: 'root' })
export class HelperService {
    constructor() { }

    getUsers() {
        return [
            { username: 'admin', password: 'Password0101', roleId: RoleEnum.ADMIN },
            { username: 'user', password: 'Password0101', roleId: RoleEnum.USER }
        ]
    }

    SetLocalStorage(key: string, obj: string | JSON | Object) {
        let objStr = JSON.stringify(obj)
        localStorage.setItem(key, objStr);
    }

    GetLocalStorage<T = any>(key: string): T {
        let objStr = localStorage.getItem(key);
        let obj = JSON.parse(objStr || '{}');
        //return (obj !== {}) ? obj as T : null;
        return obj as T;
    }


    RemoveLocalStorage(key: string) {
        localStorage.removeItem(key);
    }

    IsAdmin() {
        let currentuser = this.GetLocalStorage(StorageEnum.CURRENT_USER);
        return (currentuser.roleId == RoleEnum.ADMIN);
    }

    IsUser() {
        let currentuser = this.GetLocalStorage(StorageEnum.CURRENT_USER);
        return (currentuser.roleId == RoleEnum.USER);
    }

}