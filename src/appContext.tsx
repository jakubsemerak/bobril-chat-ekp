import * as b from "bobril";
import {UserStore} from "./stores/userStore";
import {CommentStore} from "./stores/commentStore";

export const appContext = b.createContext({
    userStore: new UserStore(),
    commentStore: new CommentStore(),
});