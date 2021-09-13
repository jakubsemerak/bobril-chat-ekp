import * as b from "bobril";
import {create as LSidebar, SidebarWidth} from "bobwai--l-view-sidebar";
import {create as SidebarItem, IData as ISidebarData} from "bobwai--sidebar-item";
import {ChatSidebarHeader} from "./chatSidebarHeader";

export interface IChatSidebarData {
    contacts: ISidebarData[];
    avatar: string;
    name: string;
}

export class ChatSidebar extends b.Component<IChatSidebarData> {
    render(): b.IBobrilChildren {
        return (
            <>
                <LSidebar width={SidebarWidth.SmallMedium}>
                    <ChatSidebarHeader avatar={this.data.avatar} name={this.data.name}/>
                    {this.data.contacts.map(item => (
                        <SidebarItem {...item} />
                    ))}
                </LSidebar>
            </>
        );
    }
}