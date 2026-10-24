import { Home, Search, LibraryBig, Settings, DiscAlbum, Sparkles, UserRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from 'react-router-dom'

interface NavItem{
    id: number,
    path: string,
    title: string,
    icon: LucideIcon
}

const navItems: NavItem[] = [
    {id: 1, path: "/", title: "Home", icon: Home},
    {id: 2, path: "/search", title: "Search", icon: Search},
    {id: 3, path: "/library", title: "Library", icon: LibraryBig},
    {id: 4, path: "/settings", title: "Settings", icon: Settings},
    {id: 5, path: "/profile", title: "Profile", icon: UserRound}
]

export default function Sidebar(){
    return (
        <div className="py-5 px-5 flex flex-col h-full">
            {/* Brand Header */}
            <div className="flex shrink-0 gap-2 items-center mb-7.5 text-xl">
                <span className="rounded-full w-7.5 h-7.5 grid place-items-center text-white text-xl bg-clay">♪</span>
                <span className="text-ink font-grotesk font-semibold">Sonora</span>
            </div>

            {/* Nav Item */}
            <div className="mb-8 shrink-0">
                <nav className="flex flex-col gap-2.5">
                    {navItems.map((item)=>{
                        const Icon = item.icon;
                        const {id, path, title} = item
                        return (
                            <NavLink key={id} to={path} className={({isActive}) => 
                            `flex gap-2 py-2.5 px-3.5 items-center font-semibold text-sm rounded-lg cursor-pointer ${isActive ? "bg-aubergine text-white" : "text-ink hover:bg-[#3A1F3D]/10 "}`
                            } >
                                <Icon size={20} />
                                <span>{title}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
            
            {/* PlayList Part */}
            <div className="mb-10 flex-1 min-h-0 flex flex-col">
                <div className="flex shrink-0 text-lg font-bold text-aubergines gap-1 items-center justify-center">
                    <span><DiscAlbum size={20} /></span>
                    <h2>Your PlayList</h2>
                </div>
                    <div className="flex-1 min-h-0 overflow-y-auto">
                        {/* If current playlist exist, render, if not display "Create New playlist" */}
                    </div>
                
            </div>

            <div className="shrink-0 mt-auto bg-cream-2 rounded-xl p-5">
                <div className="text-ink-soft text-[12px] py-2 flex gap-1.5 items-center">
                    <Sparkles size={20} />
                    <span className="">LISTENING ROOM</span>
                </div>
                <p className="text-aubergines font-semibold">Find your next favorite through someone else.</p>
            </div>
        </div>
    )
}

