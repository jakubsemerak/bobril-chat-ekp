import {observable} from "bobx";
import {DateTime} from "../tools";

export interface IComment {
    id?: number,
    text: string,
    from: number,
    to: number,
    created?: string,
    replies?: IComment[],
    isEditable?: boolean;
}

export class CommentStore {
    @observable
    private _comments: IComment[] = [];

    // Note: for testing purposes only.
    private _id = 1;

    get list(): IComment[] {
        return this._comments;
    }

    get(id: number, parentId?: number): IComment | undefined {
        // Dictionary would be better...
        if (parentId) {
            const comments = this._comments.find(o => o.id == parentId);
            return comments?.replies!.find(o => o.id == id);
        } else {
            return this._comments.find(o => o.id == id);
        }
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

    private initComment(comment: IComment): IComment {
        if (!comment.id) {
            comment.id = this._id++;
        }

        comment.replies = comment.replies ?? [];
        comment.created = comment.created ?? DateTime.now();

        return comment;
    }

    edit(commentId: number, text: string, parentId?: number): boolean {
        let editedComment: IComment | undefined;

        if (parentId) {
            editedComment = this.get(commentId, parentId);
        } else {
            editedComment = this.get(commentId);
        }

        if (editedComment) {
            editedComment.text = text;

            return true;
        }

        return false;
    }

    editReply(commentId: number, text: string, parentId: number): boolean {
        const editedComment = this.get(commentId, parentId);

        if (editedComment) {
            editedComment.text = text;

            return true;
        }

        return false;
    }
}