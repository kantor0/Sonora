import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Settings from "./components/pages/Settings";
import Home from "./components/pages/Home";
import Search from "./components/pages/Search";
import Library from "./components/pages/Library";
import NotFound from "./components/pages/NotFound";
import Notification from "./components/pages/Notification";
import {useUser} from "./components/hooks/useUser";
import { useSettings } from "./components/hooks/useSettings";
import Welcome from "./components/pages/Welcome";
import Terms from "./components/pages/Terms";
import GettingStarted from "./components/pages/GettingStarted";


export default function App(){
    const { user } = useUser();
    const { resetSettings } = useSettings()
    if(!user) {
        resetSettings(); 
        return <Welcome />
    }
    return(
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="library" element={<Library />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/notification" element={<Notification />} />
                <Route path="/terms" element={ <Terms />} />
                <Route path="/getting-started" element={<GettingStarted />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    )
}