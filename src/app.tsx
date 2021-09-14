import * as b from "bobril/index";
import {Page} from "./components/page";
import {IUser, UserStore} from "./stores/userStore";
import {CommentStore} from "./stores/commentStore";

export const sharedUserStore = new UserStore();
export const sharedCommentStore = new CommentStore();

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
        this.createUsers();
        this.createComments();
    }

    private createUsers() {
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

    private createComments() {
        sharedCommentStore.add({
            id: 1,
            from: 1,
            to: 2,
            text: "Question?",
            created: "2021.09.14",
            replies: [],
        });

        sharedCommentStore.add({
            id: 1,
            from: 2,
            to: 1,
            text: "Reply.",
            created: "2021.09.14",
            replies: [],
        });
    }
}