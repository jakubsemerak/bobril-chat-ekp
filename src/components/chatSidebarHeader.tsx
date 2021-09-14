import * as b from "bobril";
import {create as Filter} from "bobwai--filter";
import {create as HeaderText, TextStyle} from "bobwai--header-text";
import Avatar from "bobwai--avatar";

export interface IChatSidebarHeaderData {
    avatar?: string;
    name: string;

    onFilterChange(value: string | undefined): void;
}

export class ChatSidebarHeader extends b.Component<IChatSidebarHeaderData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <HeaderText content={this.data.name} leftIcon={
                    <Avatar imageSrc={this.data.avatar} size={101}/>
                } textStyle={TextStyle.Subtitle200}/>

                <Filter placeholder={"Search"} onChange={(v) => {
                    this.data.onFilterChange(v);
                    b.invalidate();
                }} onTextClear={() => {
                    this.data.onFilterChange(undefined);
                    b.invalidate();
                }}/>
            </>
        );
    }
}