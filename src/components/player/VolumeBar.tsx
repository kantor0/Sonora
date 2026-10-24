import { usePlayer } from "../hooks/usePlayer";
import Progress from "../ui/Progress";

export default function VolumeBar(){
    const {volume, setVolume} = usePlayer()
    return (
        <Progress value={volume} fillClassName="bg-clayark" onChange={setVolume} label= "Volume" />
    )
}