import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {ChatSidebar, IChatSidebarData} from "./chatSidebar";
import {Chat} from "./chat";
import {IData as ISidebarData} from "bobwai--sidebar-item/src/data";
import {IUser, UserStore} from "../stores/userStore";
import {create as CreateAvatar} from "bobwai--avatar";
import {observable} from "bobx";
import {UserChatUriPattern} from "../routes";

export interface IPageData {

}

export class Page extends b.Component<IPageData> {
    userStore = new UserStore();

    @observable
    private _selectedUser: IUser | undefined;

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
            b.runTransition(b.createRedirectPush("chat", { userId: id.toString() }));
        }
    }

    get selectedUser(): IUser | undefined {
        return this._selectedUser;
    }

    constructor() {
        super();

        this.initDummyData();
    }

    render(data: IPageData): b.IBobrilChildren {
        return <>
            <ChatSidebar contacts={
                this.userStore.list.filter(o => o.id != this.currentUser.id).map(o => ({
                    id: o.id.toString(),
                    name: o.name,
                    title: o.name,
                    iconContent: CreateAvatar({colorSeed: o.name, size: 32}),
                    isActive: this.selectedUser?.id == o.id,
                    onClick: () => this.openChatWithUser(o.id),
                }))} avatar={this.currentUser.avatar} name={this.currentUser.name}
            />
            <Chat/>
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
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
        this.userStore.add({
            id: 3,
            name: "Thomas Wood",
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
        this.userStore.add({
            id: 4,
            name: "Alen Green",
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
        this.userStore.add({
            id: 5,
            name: "Phill Barret",
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
    }
}