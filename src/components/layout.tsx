import { Outlet } from "react-router-dom";
import Sidebar from './Bars/sidebar';
import RightSidebar from './Bars/rightsidebar';
import Mobilebar from './Bars/mobilebar';

export default function Layout(){
    return(
        <div className="grid md:grid-cols-[220px_1fr_250px] h-screen overflow-hidden">
            <aside className="hidden md:block bg-cream border-r border-line relative overflow-y-auto">
                <Sidebar />
            </aside>
            
            <main>
                {/* Topbar */}
                <div></div>

                {/* Main */}
                <div>
                    <Outlet />
                </div>

                {/* bottom */}
                <div></div>
                
            </main>

            <aside className="hidden md:block border-l border-clayark overflow-y-auto bg-[#1a0f19]/90 ">
                <RightSidebar />
            </aside>

            <div className="md:hidden">
                <Mobilebar />
            </div>
        </div>
    )
}