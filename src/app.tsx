import * as b from "bobril/index";
import {Page} from "./components/page";
import {IUser, UserStore} from "./stores/userStore";
import {appContext} from "./appContext"

const sharedUserStore = b.useContext(appContext).userStore;
const sharedCommentStore = b.useContext(appContext).commentStore;

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
            from: 1,
            to: 2,
            text: "Question?",
            created: "2021.09.14",
        });

        sharedCommentStore.add({
            from: 2,
            to: 1,
            text: "Reply.",
            created: "2021.09.15",
        });

        sharedCommentStore.add({
            from: 1,
            to: 2,
            text: "I am glad that you finally answered.",
            created: "2021.09.15",
        });

        sharedCommentStore.add({
            from: 1,
            to: 3,
            text: "Hello, could we test nested replies?",
            created: "2021.09.14",
        });

        sharedCommentStore.addReply(4, {
            from: 1,
            to: 3,
            text: "Do you hear me?",
            created: "2021.09.14",
        });

        sharedCommentStore.addReply(4, {
            from: 1,
            to: 3,
            text: "...",
            created: "2021.09.20",
        });

        sharedCommentStore.addReply(4, {
            from: 3,
            to: 1,
            text: "Hey, whats the hurry?",
            created: "2021.09.25",
        });

        sharedCommentStore.addReply(4, {
            from: 1,
            to: 3,
            text: "OMG! Finally!",
            created: "2021.09.25",
        });

        sharedCommentStore.addReply(4, {
            from: 3,
            to: 1,
            text: "Hehe 😊.",
            created: "2021.10.5",
        });
    }
}