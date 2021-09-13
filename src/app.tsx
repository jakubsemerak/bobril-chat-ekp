import * as b from "bobril/index";
import Avatar, {AvatarIcon} from "bobwai--avatar";
import {Page} from "./components/page";
import {ChatSidebar} from "./components/chatSidebar";
import {Chat} from "./components/chat";

export class App extends b.Component<b.IRouteHandlerData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <Page {...this.data}/>
            </>
        );
    }
}