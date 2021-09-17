import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {ChatSidebar} from "./chatSidebar";
import {IUser} from "../stores/userStore";
import {observable} from "bobx";
import {IRouteHandlerData} from "bobril";
import {create as HeaderText, TextStyle} from "bobwai--header-text/src/lib";
import {sharedUserStore, getCurrentUser} from "../app";
import {UserAvatar} from "./userAvatar";

export interface IPageData extends IRouteHandlerData {

}

export class Page extends b.Component<IPageData> {
    userStore = sharedUserStore;

    @observable
    private _selectedUser: IUser | undefined; // should be undefined


    constructor(props: IPageData) {
        super(props);

        const userStringId = this.data.routeParams.userId;
        if (userStringId) {
            this.selectUser(parseInt(userStringId));
        }
    }

    selectUser(id: number): boolean {
        if (id != getCurrentUser().id) {
            this._selectedUser = this.userStore.get(id);

            return true;
        }

        return false;
    }

    openChatWithUser(id: number): void {
        if (this.selectUser(id)) {
            b.runTransition(b.createRedirectPush("chat", {userId: id.toString()}));
        }
    }

    get selectedUser(): IUser | undefined {
        return this._selectedUser;
    }

    public static renderChatHeader(user: IUser): b.IBobrilNode { // why it is here? I would create component ChatHeader instead
        return (
            <HeaderText content={user.name} leftIcon={<UserAvatar user={user} size={32}/>}
                        textStyle={TextStyle.Subtitle200}/>
        );
    }

    render(data: IPageData): b.IBobrilChildren {
        return <>
            <ChatSidebar contacts={
                this.userStore.list.filter(o => o.id != getCurrentUser().id).map(o => ({
                    id: o.id.toString(),
                    name: o.name,
                    title: o.name,
                    iconContent: <UserAvatar user={o} size={32}/>,
                    isActive: this.selectedUser?.id == o.id,
                    onClick: () => this.openChatWithUser(o.id),
                }))} avatar={getCurrentUser().avatar} name={getCurrentUser().name}
            />

            <LMainView sidebarWidth={SidebarWidth.SmallMedium} isCombinedWithSidebar>
                {this.data.activeRouteHandler()}
            </LMainView>
        </>
    }
}