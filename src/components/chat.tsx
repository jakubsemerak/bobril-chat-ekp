import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {create as AppHeader} from "bobwai--app-header";
import {create as EmptyState, Size} from "bobwai--empty-state";
import {observable} from "bobx";

export interface IChatData extends b.IRouteHandlerData {
    routeParams: { userId?: string };
}


export class Chat extends b.Component<IChatData> {
    @observable
    private _targetUserId: string | undefined = this.data.routeParams.userId;

    static canActivate(): b.IRouteCanResult {
        return true;
    }

    render(): b.IBobrilChildren {
        return (
            <>

                Chat with user {this._targetUserId}
            </>
        );
    }
}