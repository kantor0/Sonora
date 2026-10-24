





import { useState, type ChangeEvent, useEffect } from "react";
import type { UserProviderProps, User } from "./UserContext";
import { UserContext } from "./UserContext";


export default function UserProvider({children}: UserProviderProps){
    const [user, setUser] = useState<User | null>(()=>{
        const saved = localStorage.getItem("sonora-user");
        if(saved){
            try{
                return JSON.parse(saved)
            }catch{
                return null
            }
        }
        return null
    });

    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if(!target) return;
        const {name, value} = target;
        setUser(prev => (
            prev ? {... prev, [name]: value} : prev
        ));
    };

    useEffect(()=>{
        if(user){
            localStorage.setItem("sonora-user", JSON.stringify(user));
        };
    }, [user])

    const handleAvatarUrl = (file: File) =>{
        console.log(file)
        if(!file) return;
        const reader = new FileReader();
        reader.onload = () =>{
            const result = reader.result as string;
            setUser(prev => prev ? {...prev, avatarUrl: result} : prev)
        };
        reader.readAsDataURL(file);
    }

    return(
        <UserContext.Provider value={{user, setUser, handleUserChange, handleAvatarUrl}}>
            {children}
        </UserContext.Provider>
    )
}