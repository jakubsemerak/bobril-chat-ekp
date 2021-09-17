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

export class Chat extends b.Component<IChatData> {
    userStore = sharedUserStore;
    commentStore = sharedCommentStore;

    // should not be observable
    @observable
    private _targetUserId: string | undefined = this.data.routeParams.userId;

    // I would remove this method
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
            icon: <UserAvatar user={userFrom!} size={30}/>,
            replies: comment.replies!.map(o => this.mapComment(o)),
            isEditable: this.currentUser.id == comment.from,
        };
    }

    render(): b.IBobrilChildren {
        const chatComments = this.commentStore.getCommentsWithUser(this.currentUser.id, this.targetUser?.id);
        return (
            <>
                <AppHeader theme={2} leftContent={Page.renderChatHeader(this.targetUser!)}/>
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
                    activeCommentValue={this.commentStore.activeCommentValue}
                    activeCommentId={this.commentStore.activeCommentId}
                    defaultRootCommentId={0}
                    // new comment only
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
                    onChangeActiveCommentId={(activeCommentId, activeCommentText) => {
                        this.commentStore.setActiveComment(activeCommentId, activeCommentText ?? "")
                    }}
                    onChangeActiveCommentValue={value => this.commentStore.setActiveCommentValue(value)}
                    onEditComment={(commentId1, value, parentId) => {
                        this.commentStore.edit(commentId1, value, parentId)
                    }}

                    onDeleteComment={(commentId, parent) => {
                        // Note: weird, parentId is empty when deleting nested comment. // it is a bug
                        this.commentStore.delete(commentId, parent);
                    }}
                    onCancelComment={() => this.commentStore.cancelEdit() }
                />
            </>
        );
    }
}