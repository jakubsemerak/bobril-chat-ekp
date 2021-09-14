import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {create as AppHeader} from "bobwai--app-header";
import {create as EmptyState, Size} from "bobwai--empty-state";
import {create as ChatContent, IComment as IChatContentComment} from "bobwai--chat"
import {observable} from "bobx";
import {Page} from "./page";
import {IUser, UserStore} from "../stores/userStore";
import {getCurrentUser, sharedCommentStore, sharedUserStore} from "../app";
import {UserAvatar} from "./userAvatar";
import {IComment} from "../stores/commentStore";

export interface IChatData extends b.IRouteHandlerData {
    routeParams: { userId?: string };
}

export class Chat extends b.Component<IChatData> {
    userStore = sharedUserStore;
    commentStore = sharedCommentStore;

    @observable
    private _targetUserId: string | undefined = this.data.routeParams.userId;

    get targetUser(): IUser | undefined {
        return this.userStore.get(parseInt(this._targetUserId ?? ""));
    }

    private mapComment(comment: IComment): IChatContentComment<number> {
        return {
            id: comment.id!,
            userName: "",
            created: comment.created,
            text: comment.text,
            icon: <UserAvatar user={this.userStore.get(comment.from)} size={32}/>,
            replies: comment.replies!.map(o => this.mapComment(o)),
        };
    }

    render(): b.IBobrilChildren {
        const currentUser = getCurrentUser();
        const targetUser = this.targetUser;
        const chatComments = this.commentStore.getCommentsWithUser(currentUser.id, targetUser?.id);

        return (
            <>
                <AppHeader theme={2} leftContent={Page.renderChatHeader(this.targetUser)}/>
                <ChatContent
                    icon={<UserAvatar user={currentUser} size={32}/>}
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
                    comments={chatComments.map(o => (this.mapComment(o)))}
                    activeCommentValue={"Hmm?"}
                    defaultRootCommentId={1}
                    onActiveCommentSubmit={(parentCommentId, text) => {
                        // TODO.
                    }}
                    onChangeActiveCommentId={commentId => {
                        // TODO
                    }}
                    onChangeActiveCommentValue={value => {
                        // TODO
                    }}
                />
            </>
        );
    }
}