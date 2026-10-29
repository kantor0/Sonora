import type { LucideIcon } from "lucide-react"
import { House, Library, Search, Settings, Plus } from "lucide-react"
import { NavLink } from "react-router-dom"
interface NavItem{
    id: number
    title: string
    path: string
    icon: LucideIcon
}

const navItems: NavItem[] = [
    {id: 1, title:"Home", path: "/", icon: House},
    {id: 3, title:"Search", path: "/search", icon: Search},
    {id: 2, title: "Library", path: "/library", icon: Library},
    {id: 4, title: "Settings", path: "/settings", icon: Settings},
]

export default function Mobilebar(){

    return (
        <div className="p-4.5">
            <nav className="flex items-center justify-between -mb-3">
                {navItems.map(item => {
                    const Icon = item.icon;
                    const {id, path, title} = item
                    return (
                        <NavLink key={id} to={path} className={({isActive}) => `flex gap-2 items-center font-semibold text-md ${isActive ? "text-clay" : "text-ink-soft"}`}>
                                <div className="space-y-1 flex flex-col items-center">
                                    <Icon size={21}/>
                                    <p className="text-[15px]">{title}</p>
                                </div>
                        
                        </NavLink>
                    )
                })}
                <div className="space-y-1 flex flex-col items-center">
                    <Plus size={21} className="text-nav"/>
                    <p className="text-nav text-[15px]">Create</p>
                </div>
            </nav>
        </div>
    )
}