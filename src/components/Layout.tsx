import { Outlet } from "react-router-dom";
import Sidebar from './Bars/Sidebar.tsx';
import RightSidebar from './Bars/RightSidebar';
import Mobilebar from './Bars/Mobilebar.tsx';
import Topbar from './Layouts/Topbar';
import MiniPlayer from './Layouts/MiniPlayer';
import ToastViewport from "./ui/ToastViewport.tsx";

export default function Layout(){
    return(
        <div className="grid md:grid-cols-[220px_1fr_250px] h-screen overflow-hidden">
            <aside className="hidden md:block bg-cream border-r border-line relative overflow-y-auto">
                <Sidebar />
            </aside>
            
            <main className="flex flex-col h-screen overflow-hidden relative">
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
                
            </main>

            <aside className="hidden md:block border-l border-[#1a0f19]/90 overflow-hidden h-screen bg-gray-900 ">{/* [#1a0f19]/90 */}
                <RightSidebar />
            </aside>

            <div className="md:hidden">
                <Mobilebar />
            </div>
        </div>
    )
}