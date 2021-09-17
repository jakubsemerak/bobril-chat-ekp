import * as b from "bobril";
import {create, create as LSidebar, SidebarWidth} from "bobwai--l-view-sidebar";
import {create as SidebarItem, IData as ISidebarData} from "bobwai--sidebar-item";
import {ChatSidebarHeader} from "./chatSidebarHeader";
import {observable} from "bobx";

export interface IChatSidebarData {
    contacts: ISidebarData[]; // would it be better to pass IUser instead of ISidebarData?
    avatar?: string;
    name: string;
}

// Can you try to rewrite it to function component with hooks?
interface ISimpleFilterData<T> {
    filter: string | undefined;
    setFilter: (o: string | undefined) => void;
    filteredItems: T[];
}

function useSimpleFilter<T>(items: T[], filterField: (item: T) => string): ISimpleFilterData<T> {
    const [filter, setFilter] = b.useState<string | undefined>("");

    return {
        filter,
        setFilter,
        filteredItems: filter ? items.filter(i => filterField(i).toLowerCase().includes(filter.toLowerCase())) : items,
    };
}

export function ChatSidebar(data: IChatSidebarData): b.IBobrilNode {
    const { filter, setFilter, filteredItems } = useSimpleFilter(data.contacts, item => item.title);

    return (
        <>
            <LSidebar width={SidebarWidth.SmallMedium}>
                <ChatSidebarHeader filter={filter} avatar={data.avatar} name={data.name}
                                   onFilterChange={setFilter}/>
                {filteredItems.map(item => (
                    <SidebarItem {...item}/>
                ))}
            </LSidebar>
        </>
    );
}