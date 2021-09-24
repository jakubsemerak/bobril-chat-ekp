import {IUser} from "../stores/userStore";
import * as b from "bobril/index";
import {create as HeaderText, TextStyle} from "bobwai--header-text/src/lib";
import {UserAvatar} from "./userAvatar";

export interface IChatHeaderData {
    user: IUser;
}

export function ChatHeader(data: IChatHeaderData): b.IBobrilNode {
    return (
        <HeaderText content={data.user.name} leftIcon={<UserAvatar user={data.user} size={32}/>}
                    textStyle={TextStyle.Subtitle200}/>
    );
}