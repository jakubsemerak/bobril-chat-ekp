import * as b from "bobril";
import Avatar, {create as CreateAvatar} from "bobwai--avatar/src/avatar";
import {IUser} from "../stores/userStore";

export interface IUserAvatarData {
    user: IUser | undefined;
    size: number;
}

export class UserAvatar extends b.Component<IUserAvatarData> {
    render(): b.IBobrilChildren {
        let avatar: b.IBobrilNode = <></>;

        if (this.data.user) {
            if (this.data.user.avatar) {
                avatar = (<Avatar imageSrc={this.data.user.avatar} size={this.data.size}/>);
            } else {
                avatar = CreateAvatar({colorSeed: this.data.user?.name, size: this.data.size});
            }
        }

        return avatar;
    }
}