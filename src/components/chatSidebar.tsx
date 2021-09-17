import * as b from "bobril";
import {create as LSidebar, SidebarWidth} from "bobwai--l-view-sidebar";
import {create as SidebarItem, IData as ISidebarData} from "bobwai--sidebar-item";
import {ChatSidebarHeader} from "./chatSidebarHeader";
import {observable} from "bobx";

export interface IChatSidebarData {
    contacts: ISidebarData[];
    avatar?: string;
    name: string;
}

export function ChatSidebar(data: IChatSidebarData): b.IBobrilNode {
    const [filter, setFilter] = b.useState<string | undefined>("");

    return (
        <>
            <LSidebar width={SidebarWidth.SmallMedium}>
                <ChatSidebarHeader avatar={data.avatar} name={data.name}
                                   onFilterChange={setFilter}/>
                {data.contacts.filter(o => isMatch(o, filter)).map(item => (
                    <SidebarItem {...item}/>
                ))}
            </LSidebar>
        </>
    );
}

function isMatch(item: ISidebarData, query: string | undefined): boolean {
    if (query == undefined) return true;

    // Note: does not support accent insensitive search.
    return item.title.toLowerCase().includes(query!.toLowerCase());
}