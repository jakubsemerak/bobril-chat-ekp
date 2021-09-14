import * as b from "bobril/index";
import Avatar, {AvatarIcon} from "bobwai--avatar";
import {Page} from "./components/page";
import {ChatSidebar} from "./components/chatSidebar";
import {Chat} from "./components/chat";
import {IUser, UserStore} from "./stores/userStore";

export const sharedUserStore = new UserStore();

// Just assume that first user is logged in.
export function getCurrentUser(): IUser {
    return sharedUserStore.list[0];
}

export class App extends b.Component<b.IRouteHandlerData> {
    constructor() {
        super();
        this.initDummyData();
    }
    
    render(): b.IBobrilChildren {
        return (
            <>
                <Page {...this.data}/>
            </>
        );
    }

    private initDummyData() {
        sharedUserStore.add({
            id: 1,
            name: "John Mitchell",
            avatar: "https://www.w3schools.com/html/img_girl.jpg",
        });
        sharedUserStore.add({
            id: 2,
            name: "Hans Becker",
        });
        sharedUserStore.add({
            id: 3,
            name: "Thomas Wood",
        });
        sharedUserStore.add({
            id: 4,
            name: "Alen Green",
        });
        sharedUserStore.add({
            id: 5,
            name: "Phil Barret",
        });
    }
}