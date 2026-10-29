import { Outlet } from "react-router-dom";
import Sidebar from './Bars/Sidebar.tsx';
import RightSidebar from './Bars/RightSidebar';
import Mobilebar from './Bars/Mobilebar.tsx';
import Topbar from './Layouts/Topbar';
import MiniPlayer from './Layouts/MiniPlayer';
import ToastViewport from "./ui/ToastViewport.tsx";
import { useLocalStorage } from "./hooks/useLocalStorage.ts";
import { ChevronRight } from "lucide-react";

export default function Layout(){
    const [isRightOpen, setIsRightOpen] = useLocalStorage<boolean>("sonora-right-open", true);
    const cols = isRightOpen ? "md:grid-cols-[220px_1fr_250px]" : "md:grid-cols-[220px_1fr_0px]"
    return(
        <div className={`grid transition-[gridtemplate-columns] duration-300 ease-in-out motion-reduce:transition-none h-screen ${cols} overflow-hidden`}>
            <aside className="hidden md:block bg-cream border-r border-line relative overflow-y-auto">
                <Sidebar />
            </aside>
            
            <main className="flex flex-col h-screen overflow-hidden relative min-w-0">
                <ToastViewport />
                {/* Topbar */}
                <div className="shrink-0 bg-cream border-b border-line pb-1.5">
                    <Topbar />
                </div>

                {/* Main */}
                <div className="flex-1 bg-cream overflow-hidden">
                    <div className="custom-scrollbar py-7.5 px-7.5 overflow-y-auto h-full">
                    <Outlet />
                    </div>
                </div>

                {/* bottom */}
                <div className="shrink-0 bg-aubergine">
                    <MiniPlayer />
                </div>
                
                <div className="shrink-0 md:hidden bg-paper">
                    <Mobilebar />
                </div>
            </main>

            <button type="button" onClick={() => setIsRightOpen((v) => !v)} aria-expanded={isRightOpen} aria-label={isRightOpen ? "Close sidebar" : "Open sidebar"} className={`fixed top-6 text-red-400 z-30 hidden md:flex transition-[right] duration-300 ${isRightOpen ? "right-[220px]" : "right-2"}`}>
                <ChevronRight size={28} className={`transition-transform cursor-pointer duration-300 ${isRightOpen ? "" : "rotate-180"}`} />
            </button>

            <aside className="hidden md:block overflow-hidden h-screen bg-gray-900 ">{/* [#1a0f19]/90 */}
                <div className="w-[250px] border-l border-[#1a0f19]/90">
                    <RightSidebar />
                </div>
            </aside>

        </div>
    )
}