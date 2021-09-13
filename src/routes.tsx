import * as b from "bobril";
import {App} from "./app";
import {Chat} from "./components/chat";
import {ChatClosed} from "./components/chatClosed";

export function initRoutes() {
    const chatClosed: b.IRoute = b.route({
        handler: data => <ChatClosed {...data} />,
        name: "chatClosed",
        url: "/",
    });

    b.routes(
        b.route({handler: data => <App {...data} />}, [
            b.route({
                handler: data => <Chat {...data} />,
                name: "chat",
                url: "/chat/:userId",
            }),
            b.route(chatClosed),
            b.routeDefault(chatClosed)
        ])
    );
}