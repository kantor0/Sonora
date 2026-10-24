import { Outlet } from "react-router-dom";
import Sidebar from './Bars/Sidebar.tsx';
import RightSidebar from './Bars/RightSidebar';
import Mobilebar from './Bars/Mobilebar.tsx';
import Topbar from './Layouts/Topbar';
import MiniPlayer from './Layouts/MiniPlayer';

export default function Layout(){
    return(
        <div className="grid md:grid-cols-[220px_1fr_250px] h-screen overflow-hidden">
            <aside className="hidden md:block bg-cream border-r border-line relative overflow-y-auto">
                <Sidebar />
            </aside>
            
            <main className="flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <div className="shrink-0 bg-cream border-b border-line pb-1.5">
                    <Topbar />
                </div>

                {/* Main */}
                <div className="flex-1 bg-cream">
                    <Outlet />
                </div>

                {/* bottom */}
                <div className="shrink-0 bg-aubergines">
                    <MiniPlayer />
                </div>
                
            </main>

            <aside className="hidden md:block border-l border-[#1a0f19]/90 overflow-y-auto bg-gray-900 ">{/* [#1a0f19]/90 */}
                <RightSidebar />
            </aside>

            <div className="md:hidden">
                <Mobilebar />
            </div>
        </div>
    )
}