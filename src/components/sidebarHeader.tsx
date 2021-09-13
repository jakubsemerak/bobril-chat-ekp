import * as b from "bobril";
import Avatar, {AvatarIcon, IData} from "bobwai--avatar";
import {create as createFilter} from "bobwai--filter";

export interface ISidebarHeaderData {
    // onSubmit(value: string): void;
}

export class SidebarHeader extends b.Component {
    render(): b.IBobrilChildren {
        return (
            <>
                <Avatar imageSrc={"https://www.w3schools.com/html/img_girl.jpg"} size={101}/>
                John Mitchell
                {createFilter({
                    placeholder: "Search",
                    onChange: () => null,
                    onTextClear: () => null,
                })}
            </>
        );
    }
}