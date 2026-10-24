import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";





export function useUser(){
    const ctx = useContext(UserContext);
    if(!ctx){
        throw new Error("useUser must be used inside UserProvider")
    }
    return ctx
}