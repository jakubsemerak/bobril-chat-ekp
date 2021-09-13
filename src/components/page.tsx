import * as b from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";
import {ChatSidebar, IChatSidebarData} from "./chatSidebar";
import {Chat} from "./chat";
import {IData as ISidebarData} from "bobwai--sidebar-item/src/data";
import {IUser, UserStore} from "../stores/userStore";

export interface IPageData {

}

export class Page extends b.Component<IPageData> {
    userStore = new UserStore();

    // Just assume that first user is logged in.
    get currentUser(): IUser {
        return this.userStore.list[0];
    }

    constructor() {
        super();

        this.initDummyData();
    }

    render(data: IPageData): b.IBobrilChildren {
        return <>
            <ChatSidebar contacts={
                this.userStore.list.map(o => ({
                    id: o.id.toString(),
                    name: o.name,
                    title: o.name,
                    avatar: null,
                    onClick: () => null, //TODO
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
    }
}