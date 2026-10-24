import { PlayerContext } from "../contexts/PlayerContext";
import { useContext } from "react";





export function usePlayer(){
    const ctx = useContext(PlayerContext);
    if(!ctx){
        throw new Error("usePlayer must be used inside PlayerProvider");
    };
    return ctx
}