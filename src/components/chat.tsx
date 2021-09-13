import * as b from "bobril";
import {IRouteHandlerData} from "bobril";
import {SidebarWidth} from "bobwai--l-view-sidebar/src/lib";
import {create as LMainView} from "bobwai--l-view-main/src/lib";

export interface IChatWindowData {
    // onSubmit(value: string): void;
}

export class Chat extends b.Component {
    render(): b.IBobrilChildren {
        return (
            <>
                <LMainView sidebarWidth={SidebarWidth.Large} isCombinedWithSidebar>
                    <div>
                        main view
                    </div>
                </LMainView>
            </>
        );
    }
}