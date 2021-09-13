import * as b from "bobril";
import {IRouteHandlerData} from "bobril";

export interface IChatWindowData {
    // onSubmit(value: string): void;
}

export class ChatClosed extends b.Component<IRouteHandlerData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <div>TODO No chat selected.</div>
            </>
        );
    }
}