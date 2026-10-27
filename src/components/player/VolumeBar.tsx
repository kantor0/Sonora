import { usePlayer } from "../hooks/usePlayer";
import Progress from "../ui/Progress";

export default function VolumeBar(){
    const {volume, setVolume} = usePlayer();
    const newVolume = String(Math.floor(volume)).padStart(2, "0")
    const oriVolume = newVolume === "00" ? "0" : newVolume
    return (
        <>
            <Progress value={volume} fillClassName="bg-clayark" onChange={setVolume} label= "Volume" />
            <p>{oriVolume}</p>
        </>
    )
}