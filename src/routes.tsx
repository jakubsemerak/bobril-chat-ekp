import * as b from "bobril";
import {App} from "./app";
import {Chat} from "./components/chat";
import {ChatClosed} from "./components/chatClosed";
import {IRouteConfig} from "bobril/src/router";

export function initRoutes() {
    const chat: b.IRouteConfig = {
        handler: data => <Chat {...data} />,
        name: "chat",
        url: "/chat/:userId?",
        keyBuilder: keyBuilder,
    };

    b.routes(
        b.route({handler: data => <App {...data} />}, [
            b.route(chat),
            b.routeDefault({handler: data => <ChatClosed {...data}/>})
        ])
    );
}

function keyBuilder(params: b.Params): string {
    if (params.userId) {
        return params.userId;
    }
    throw new Error("Route parameter doesn't exist ");
}