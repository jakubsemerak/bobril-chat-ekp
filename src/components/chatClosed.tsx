import * as b from "bobril";
import {IRouteHandlerData} from "bobril";
import {create as EmptyState, Size} from "bobwai--empty-state/src/lib";

export class ChatClosed extends b.Component<IRouteHandlerData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <EmptyState size={Size.Large} message={"No chat selected"}/>
            </>
        );
    }
}