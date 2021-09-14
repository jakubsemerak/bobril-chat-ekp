import {observable} from "bobx";

export interface IComment {
    id: number,
    text: string,
    from: number,
    to: number,
    created: string,
    replies: IComment[],
}

export class CommentStore {
    @observable
    private _comments: IComment[] = [];

    get list(): IComment[] {
        return this._comments;
    }

    get(id: number): IComment | undefined {
        // Dictionary would be better...
        return this._comments.find(o => o.id == id);
    }

    getCommentsWithUser(currentUserId: number, targetUserId: number | undefined): IComment[] {
        return this._comments.filter(o =>
            (o.from == currentUserId && o.to == targetUserId)
            ||
            (o.from == targetUserId && o.to == currentUserId)
        );
    }

    add(user: IComment): void {
        this._comments.push(user);
    }

    // edit(index: number, value: boolean): void {
    //     this._users[index].done = value;
    // }
}