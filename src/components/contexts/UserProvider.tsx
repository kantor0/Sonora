import type { UserProviderProps, User } from "./UserContext";
import { UserContext } from "./UserContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ChangeEvent } from "react";
import { useToast } from "../hooks/useToast";

export default function UserProvider({children}: UserProviderProps){
    const [user, setUser] = useLocalStorage<User | null>("sonora-user", null)
    const { showToast } = useToast()
    const handleUserChange = (e: ChangeEvent<HTMLInputElement>) => {
        const target = e.target;
        if(!target) return;
        const {name, value} = target;
        setUser(prev => (
            prev ? {... prev, [name]: value} : prev
        ));
    };



    const handleAvatarUrl = (file: File) =>{
        console.log(file)
        if(!file) return;
        const reader = new FileReader();
        reader.onload = () =>{
            const result = reader.result as string;
            if(result){
                showToast({title: "Profile picture updated", description:`You changed your profile picture on ${new Date(Date.now()).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric'})} at ${new Date(Date.now()).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: false})}`,kind: "info", persist: true})
            }
            setUser(prev => prev ? {...prev, avatarUrl: result} : prev);
        };
        reader.readAsDataURL(file);
    }

    return(
        <UserContext.Provider value={{user, setUser, handleUserChange, handleAvatarUrl}}>
            {children}
        </UserContext.Provider>
    )
}