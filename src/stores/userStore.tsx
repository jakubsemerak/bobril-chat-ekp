import { observable } from "bobx";

export interface IUser {
    id: number,
    name: string,
    avatar: string,
}

export class UserStore {
    @observable
    private _users: IUser[] = [];

    get list(): IUser[] {
        return this._users;
    }

    get(id: number): IUser | undefined {
        // Dictionary would be better...
        return this._users.find(o => o.id == id);
    }

    add(user: IUser): void {
        this._users.push(user);
    }

    // edit(index: number, value: boolean): void {
    //     this._users[index].done = value;
    // }
}