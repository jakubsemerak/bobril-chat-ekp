import * as b from "bobril";
import {create as AppHeader} from "bobwai--app-header";
import {create as ChatContent, IComment as IChatContentComment} from "bobwai--chat"
import {observable} from "bobx";
import {Page} from "./page";
import {IUser} from "../stores/userStore";
import {getCurrentUser, sharedCommentStore, sharedUserStore} from "../app";
import {UserAvatar} from "./userAvatar";
import {IComment} from "../stores/commentStore";

export interface IChatData extends b.IRouteHandlerData {
    routeParams: { userId?: string };
}

let globalComment: string = "";
let globalActiveCommentId: number | undefined;
let globalDefaultCommentId: number;

export class Chat extends b.Component<IChatData> {
    userStore = sharedUserStore;
    commentStore = sharedCommentStore;

    @observable
    private _targetUserId: string | undefined = this.data.routeParams.userId;

    @observable
    public static _comment: string = "";

    @observable
    public _commentId: number = -1;

    get currentUser(): IUser {
        return getCurrentUser();
    }
    get targetUser(): IUser | undefined {
        return this.userStore.get(parseInt(this._targetUserId ?? ""));
    }

    private mapComment(comment: IComment): IChatContentComment<number> {
        const userFrom = this.userStore.get(comment.from);

        return {
            id: comment.id!,
            userName: userFrom!.name,
            created: comment.created!,
            text: comment.text,
            icon: <UserAvatar user={userFrom} size={30}/>,
            replies: comment.replies!.map(o => this.mapComment(o)),
            isEditable: this.currentUser.id == comment.from,
        };
    }

    render(): b.IBobrilChildren {
        const chatComments = this.commentStore.getCommentsWithUser(this.currentUser.id, this.targetUser?.id);

        return (
            <>
                <AppHeader theme={2} leftContent={Page.renderChatHeader(this.targetUser)}/>
                <ChatContent
                    icon={<UserAvatar user={this.currentUser} size={30}/>}
                    labels={{
                        submit: "Submit",
                        cancel: "Cancel",
                        newComment: "New Comment",
                        edit: "Edit",
                        removeComment: "Delete",
                        reply: "Reply",
                        label: "Social Commenting",
                    }}
                    headerOff

                    placeholderText={"Your comment"}
                    comments={chatComments.map(o => (this.mapComment(o)))}
                    activeCommentValue={globalComment}
                    activeCommentId={globalActiveCommentId}
                    defaultRootCommentId={globalDefaultCommentId}
                    onActiveCommentSubmit={(parentCommentId, text) => {
                        if (parentCommentId) {
                            this.commentStore.addReply(parentCommentId, {
                                from: this.currentUser.id,
                                to: this.targetUser!.id,
                                text: text,
                            });
                        } else {
                            this.commentStore.add({
                                from: this.currentUser.id,
                                to: this.targetUser!.id,
                                text: text,
                            });
                        }
                    }}
                    onChangeActiveCommentId={newCommentId => {
                        globalActiveCommentId = newCommentId;

                        b.invalidate();
                    }}

                    onChangeActiveCommentValue={value => {
                        // TODO weird behaviour when replying to comment from DB.
                        globalComment = value;

                        // TODO is this necessary? What about observable?
                        b.invalidate();
                    }}


                    onEditComment={(commentId1, value, parentId) => {
                        const comment = this.commentStore.get(commentId1, parentId);

                        if (comment?.from != this.currentUser.id) {
                            return;
                        }

                        if (parentId) {
                            this.commentStore.edit(commentId1, value, parentId);
                        } else {
                            this.commentStore.edit(commentId1, value);
                        }

                        globalComment = "";
                        globalActiveCommentId = undefined;
                        b.invalidate();
                    }}

                    onDeleteComment={(commentId, parent) => {

                        // Note: weird, parentId is empty when deleting nested comment.
                        this.commentStore.delete(commentId);
                        b.invalidate();
                    }}

                    onCancelComment={() => {
                        globalActiveCommentId = undefined;
                        b.invalidate();
                    }}
                />
            </>
        );
    }
}