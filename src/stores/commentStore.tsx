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

    private _getIndex(comments: IComment[] | undefined, id: number): number {
        // Dictionary would be better...
        return comments?.findIndex(o => o.id == id) ?? -1;
    }

    private _get(comments: IComment[] | undefined, id: number): [comment: IComment | undefined, index: number] {
        const index = this._getIndex(comments, id);
        let foundComment: IComment | undefined = undefined;

        if (index != -1 && comments) {
            foundComment = comments[index];
        }

        return [foundComment, index];
    }

    get(id: number, parentId?: number): IComment | undefined {
        let comment = this._get(this._comments, parentId ?? id);

        if (parentId && comment[0]) {
            comment = this._get(comment[0].replies, id);
        } else if (!comment) {
            // When we do not have parentId but we want to look for child comments too.
            for (let parent of this._comments) {
                comment = this._get(parent.replies, id);

                if (comment) break;
            }
        }

        return comment[0];
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

    private _delete(comments: IComment[], index: number): boolean {
        if (index < 0) return false;

        return comments.splice(index, 1).length > 0;
    }

    delete(commentId: number): boolean {
        let editedComment = this._get(this._comments, commentId);
        let index = editedComment[1];

        if (index < 0) {
            // Child comment removal.
            for (let parent of this._comments) {
                let childIndex = this._get(parent.replies, commentId)[1];

                if (childIndex != -1) {
                    if (this._delete(parent.replies!, childIndex)) {
                        return true;
                    }
                }
            }
        } else {
            return this._delete(this._comments, index);
        }


        return false;
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
}