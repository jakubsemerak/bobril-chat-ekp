import * as b from "bobril";
import Avatar from "bobwai--avatar/src/avatar";
import {IUser} from "../stores/userStore";

export interface IUserAvatarData {
    user: IUser;
    size: number;
}

export function UserAvatar(data: IUserAvatarData): b.IBobrilNode {
    return data.user.avatar ?
        <Avatar imageSrc={data.user.avatar} size={data.size}/> : <Avatar colorSeed={data.user.name} size={data.size}/>
}