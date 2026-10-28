import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";


type Sizes = "sm" | "md" | "lg" 

interface Props{
    size: Sizes,
    clickable?: boolean,
    className?: string
}

export default function AvatarImg( {size = "sm", clickable = false, className=""}: Props ){
    const { user, handleAvatarUrl } = useUser();
    const FileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
    const sizes = {
        sm: "w-11 h-11",
        md: "w-14 h-14",
        lg: "w-16.5, h-16.5"
    }

    /* Click Function */
    const handleClick = () =>{
        if(clickable && FileInputRef.current){
            FileInputRef.current?.click()
        }else{
            navigate("/profile")
        }
    }

    const name = user ? user.displayName?.split(" ")[0] : "Guest";
    const avatarLink = user?.avatarUrl
    const hasAvatar = !!avatarLink
    
    return (
        <>
            <div className={`${sizes[size]} flex items-center justify-center rounded-full border-line bg-cream-2 text-clayark border overflow-hidden cursor-pointer ${className}`} onClick={handleClick}>
                {hasAvatar ? 
                <img src={avatarLink} className=" w-full h-full rounded-full object-cover" alt={name} />
                : 
                <div className="grid place-items-center ">{name.slice(0,2).toUpperCase()}</div>
                }
            </div>

            {clickable && (
                <input type="file" accept="image/*" ref={FileInputRef} onChange={(e)=>{
                    const file = e.target.files?.[0]
                    if(file) handleAvatarUrl(file);
                }} className="hidden" />
            )}
        </>
    )
}