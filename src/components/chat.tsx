import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {create as AppHeader} from "bobwai--app-header";
import {create as EmptyState, Size} from "bobwai--empty-state";
import {create as ChatContent} from "bobwai--chat"
import {observable} from "bobx";
import {Page} from "./page";
import {IUser, UserStore} from "../stores/userStore";
import {getCurrentUser, sharedUserStore} from "../app";

export interface IChatData extends b.IRouteHandlerData {
    routeParams: { userId?: string };
}

export class Chat extends b.Component<IChatData> {
    userStore = sharedUserStore;

    @observable
    private _targetUserId: string | undefined = this.data.routeParams.userId;

    get targetUser() : IUser | undefined {
        return this.userStore.get(parseInt(this._targetUserId ?? ""));
    }

    render(): b.IBobrilChildren {
        const currentUser = getCurrentUser();
        const targetUser = this.targetUser;

        return (
            <>
                <AppHeader theme={2} leftContent={Page.renderChatHeader(this.targetUser)}/>
                {/*<ChatContent icon={currentUser.avatar}/>*/}
            </>
        );
    }
}