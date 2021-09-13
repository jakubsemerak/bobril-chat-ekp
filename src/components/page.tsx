import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {ChatSidebar, IChatSidebarData} from "./chatSidebar";
import {Chat} from "./chat";
import {IData as ISidebarData} from "bobwai--sidebar-item/src/data";
import {IUser, UserStore} from "../stores/userStore";
import Avatar, {create as CreateAvatar} from "bobwai--avatar";
import {observable} from "bobx";
import {IRouteHandlerData} from "bobril";
import {create as AppHeader} from "bobwai--app-header/src/lib";
import {create as EmptyState, Size} from "bobwai--empty-state/src/lib";
import {ChatSidebarHeader} from "./chatSidebarHeader";
import {create as HeaderText, TextStyle} from "bobwai--header-text/src/lib";

export const sharedUserStore = new UserStore();

export interface IPageData extends IRouteHandlerData {

}

export class Page extends b.Component<IPageData> {
    userStore = sharedUserStore;

    @observable
    private _selectedUser: IUser | undefined;

    constructor() {
        super();

        this.initDummyData();
    }

    // Just assume that first user is logged in.
    get currentUser(): IUser {
        return this.userStore.list[0];
    }

    selectUser(id: number): boolean {
        if (id != this.currentUser.id) {
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

    // TODO Avatar component.
    public static renderAvatar(user: IUser | undefined, size: number): b.IBobrilNode {
        let avatar: b.IBobrilNode = <></>;

        if (user) {
            if (user.avatar) {
                avatar = (<Avatar imageSrc={user.avatar} size={size}/>);
            } else {
                avatar = CreateAvatar({colorSeed: user?.name, size: size});
            }
        }

        return avatar;
    }

    public static renderChatHeader(user?: IUser): b.IBobrilNode {
        return (
            <HeaderText content={user?.name} leftIcon={Page.renderAvatar(user, 32)} textStyle={TextStyle.Subtitle200}/>
        );
    }

    render(data: IPageData): b.IBobrilChildren {
        return <>
            <ChatSidebar contacts={
                this.userStore.list.filter(o => o.id != this.currentUser.id).map(o => ({
                    id: o.id.toString(),
                    name: o.name,
                    title: o.name,
                    iconContent: Page.renderAvatar(o, 32),
                    isActive: this.selectedUser?.id == o.id,
                    onClick: () => this.openChatWithUser(o.id),
                }))} avatar={this.currentUser.avatar} name={this.currentUser.name}
            />

            <LMainView sidebarWidth={SidebarWidth.SmallMedium} isCombinedWithSidebar>
                {this.data.activeRouteHandler()}
            </LMainView>
        </>
    }

    private initDummyData() {
        this.userStore.add({
            id: 1,
            name: "John Mitchell",
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
        this.userStore.add({
            id: 2,
            name: "Hans Becker",
        });
        this.userStore.add({
            id: 3,
            name: "Thomas Wood",
        });
        this.userStore.add({
            id: 4,
            name: "Alen Green",
        });
        this.userStore.add({
            id: 5,
            name: "Phil Barret",
        });
    }
}