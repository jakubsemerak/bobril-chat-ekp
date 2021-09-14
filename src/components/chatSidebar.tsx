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

export class ChatSidebar extends b.Component<IChatSidebarData> {
    @observable
    private _filter: string | undefined;

    get contacts(): ISidebarData[] {
        return this.data.contacts.filter(o => this.IsMatch(o, this._filter));
    }

    private IsMatch(item: ISidebarData, query: string | undefined): boolean {
        if (query == undefined) return true;

        // Note: does not support accent insensitive search.
        return item.title.toLowerCase().includes(query!.toLowerCase());
    }

    private setFilter(query: string | undefined) {
        this._filter = query;
    }

    render(): b.IBobrilChildren {
        return (
            <>
                <LSidebar width={SidebarWidth.SmallMedium}>
                    <ChatSidebarHeader avatar={this.data.avatar} name={this.data.name}
                                       onFilterChange={o => this.setFilter(o)}/>
                    {this.contacts.map(item => (
                        <SidebarItem {...item}/>
                    ))}
                </LSidebar>
            </>
        );
    }
}