



import { useState, useEffect } from "react";
import Progress from "../ui/Progress";
import { usePlayer } from "../hooks/usePlayer";
import { formatTime } from "../utils/formatTime";

interface SeekBarProps{
    showTimes?: boolean
}

export default function SeekBar({showTimes = false}: SeekBarProps){
    const {audioRef} = usePlayer()
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(()=>{
        const audio = audioRef.current;
        if(!audio) return;
        const update = () =>{
            setCurrentTime(audio.currentTime);
            setDuration(audio.duration);
        };

        audio.addEventListener("timeupdate", update)
        audio.addEventListener("loadedmetadata", update);

        return () => {
        audio.removeEventListener("timeupdate", update)
        audio.removeEventListener("loadedmetadata", update);
        }
    }, [audioRef]);

    const percent = duration > 0 ? currentTime / duration * 100 : 0;
    const handleSeek = (v: number) =>{
        const audio = audioRef.current;
        if(!audio || !(duration > 0)) return;
        const newTime = (v / 100) * duration;
        audio.currentTime = newTime
    }

    return(
        <div>
            <Progress value={percent} label="Seek" fillClassName="bg-green-500" onChange={handleSeek} />
            {showTimes && (
                <div className="flex items-center justify-between px-1 text-sm">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            )}
        </div>
    )
}