import * as b from "bobril";
import {App} from "./app";
import {Chat} from "./components/chat";
import {ChatClosed} from "./components/chatClosed";

export function initRoutes() {
    const chat: b.IRoute = b.route({
        handler: data => <Chat {...data} />,
        name: "chat",
        url: "/chat/:userId?",
        // keyBuilder: keyBuilder,
    });

    b.routes(
        b.route({handler: data => <App {...data} />}, [
            b.route(chat),
            b.routeDefault(chat)
        ])
    );
}

function keyBuilder(params: b.Params): string {
    if (params.userId) {
        return params.userId;
    }
    throw new Error("Route parameter doesn't exist ");
}