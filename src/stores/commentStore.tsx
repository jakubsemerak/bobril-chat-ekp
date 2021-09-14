import {observable} from "bobx";

export interface IComment {
    id?: number,
    text: string,
    from: number,
    to: number,
    created: string,
    replies?: IComment[],
}

export class CommentStore {
    @observable
    private _comments: IComment[] = [];

    // Note: for testing purposes only.
    private _id = 1;

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

    add(comment: IComment): void {
        this._comments.push(this.initComment(comment));
    }

    addReply(commentId: number, comment: IComment): boolean {
        const targetComment = this.get(commentId);

        if (targetComment) {
            targetComment.replies?.push(this.initComment(comment));
            return true;
        }

        return false;
    }

    private initComment(comment: IComment) : IComment {
        if (!comment.id) {
            comment.id = this._id++;
        }

        if (comment.replies === undefined) {
            comment.replies = [];
        }

        return comment;
    }

    // edit(index: number, value: boolean): void {
    //     this._users[index].done = value;
    // }
}