



import ToastViewport from "../ui/ToastViewport";
import LeftAuthView from "../Layouts/LeftAuthView";
import RightAuthView from "../Layouts/RightAuthView";
import Terms from "./Terms";
import { useState } from "react";

export default function Welcome(){
    const [isTerms, setIsTerms] = useState(false)
    const handleClick = () => {
        setIsTerms(!isTerms)
    }
    return(
        <div className="relative h-screen overflow-none grid grid-cols-1 md:grid-cols-2">
            <ToastViewport />
            <LeftAuthView />


             {/* RIGHT AUTH VIEW */}

             <div className="custom-scrollbar bg-cream py-14 px-14 flex flex-col justify-between overflow-y-auto">
                {isTerms ? <Terms handleclick={handleClick} useInternal={false} /> : <RightAuthView handleTerms={handleClick} />}
             </div>
        </div>
    )
}


