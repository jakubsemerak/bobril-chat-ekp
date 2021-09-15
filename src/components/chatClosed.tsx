import * as b from "bobril";
import {IRouteHandlerData} from "bobril";
import {create as EmptyState, Size} from "bobwai--empty-state/src/lib";
import {ChildrenDisplayType, HorizontalCenterType, LCenter, VerticalCenterType} from "bobwai--l-center"

export function ChatClosed(data: IRouteHandlerData): b.IBobrilNode {
    return (
        <LCenter verticalCenterType={VerticalCenterType.Center} horizontalCenterType={HorizontalCenterType.Center}
                 childrenDisplayType={ChildrenDisplayType.InlineBlock} height={800}>
            <EmptyState size={Size.Large} message={"No chat selected."}/>
        </LCenter>
    );
}