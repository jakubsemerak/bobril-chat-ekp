import {observable} from "bobx";
import {DateTime} from "../tools";

export interface IComment {
    id?: number,
    text: string,
    from: number,
    to: number,
    created?: string | undefined, // because observable must be always defined
    replies?: IComment[],
}

// TODO: missing tests for comment store
export class CommentStore {


    // Note: two dictionaries could be used:
    //          { id, comment }, replies { parentCommentId, { id, comment } }
    @observable
    private _comments: IComment[] = [];

    // Note: for testing purposes only.
    private _id = 1;

    // This was previously directly in the component but it had only main issue
    // -> it could not be tested. So it was moved to this place.
    @observable
    private _activeCommentId: number | undefined = undefined;

    @observable
    private _activeCommentValue: string = "";

    // --

    get list(): IComment[] {
        return this._comments;
    }

    get activeCommentValue(): string {
        return this._activeCommentValue;
    }

    set activeCommentValue(value: string) {
        this._activeCommentValue = value;
    }

    get activeCommentId(): number | undefined {
        return this._activeCommentId;
    }

    set activeCommentId(value: number | undefined) {
        this._activeCommentId = value;
    }

    cancelEdit(): void {
        this._activeCommentValue = "";
        this._activeCommentId = undefined;
    }

    // Note: We do not name methods with "_" prefix, just private properties.
    private getIndex(comments: IComment[] | undefined, id: number): number {
        // Dictionary would be better...
        return comments?.findIndex(o => o.id == id) ?? -1;
    }

    private _get(comments: IComment[] | undefined, id: number): [comment: IComment | undefined, index: number] {
        const index = this.getIndex(comments, id);
        let foundComment: IComment | undefined = undefined;

        if (index != -1 && comments) {
            foundComment = comments[index];
        }

        return [foundComment, index];
    }

    get(id: number, parentId?: number): IComment | undefined {
        // Note: it is quite complex for the thing it is doing.
        let comment = this._get(this._comments, parentId ?? id);

        if (parentId && comment[0]) {
            comment = this._get(comment[0].replies, id);
        } else if (comment[1] < 0) {
            // When we do not have parentId but we want to look for child comments too.
            // Because theres a bug in the component - we do not get parentId when editing an comment.
            for (let parent of this._comments) {
                comment = this._get(parent.replies, id);

                if (comment[1] != -1) break;
            }
        }

        return comment[0];
    }

    // TODO: Since currentUser is global, it is not necessary to pass him.
    // TODO: Computed might be used.
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

    edit(commentId: number, text: string, parentId?: number | undefined): boolean {
        let editedComment: IComment | undefined;

        if (parentId) {
            editedComment = this.get(commentId, parentId);
        } else {
            editedComment = this.get(commentId);
        }

        if (!editedComment) {
            throw `Comment with commentId ${commentId} not found.`;
        }

        editedComment.text = text;

        this._activeCommentId = undefined;
        this.activeCommentValue = "";

        return false;
    }
}