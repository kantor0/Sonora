import { useState, useRef, useEffect } from 'react';
import { PlayerContext } from './PlayerContext';
import type { Track, PlayerProviderProps } from './PlayerContext';


export default function PlayerProvider({children}: PlayerProviderProps){
    const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);
    const [volume, setVolume] = useState(70)
    const  hasBeenAddedToRecent = useRef<boolean>(false);
    const [queue, setQueue] = useState<Track[]>([]);
    const [currentIndex, setCurrentIndex] = useState(-1);

    const startTrack = (track: Track) => {
        const {audioUrl} = track;
        setCurrentTrack(track);
        if(audioRef.current){
            audioRef.current.src = audioUrl;
            audioRef.current.play();
            setIsPlaying(true)
        }
        hasBeenAddedToRecent.current = false
    }

    const playTrack = (track: Track, list?: Track[]) =>{
        const queueList = list ?? [track];
        const index = queueList.findIndex(item => item.id === track.id);
        setQueue(queueList);
        setCurrentIndex(index);
        startTrack(track)
    };

    useEffect(()=>{
        const audio = audioRef.current;
        if(!audio) return;
        const handler = () => {
            if(audio.currentTime > 10 && currentTrack && !hasBeenAddedToRecent.current){
                setRecentlyPlayed((prev)=>{
                    const filtered = prev.filter(item => item.id !== currentTrack.id);
                    return [currentTrack, ...filtered].slice(0, 20)
                });
                hasBeenAddedToRecent.current = true;
            }
        };
        audio.addEventListener("timeupdate", handler);
        return () => audio.removeEventListener("timeupdate", handler);
        
    }, [currentTrack]);

    useEffect(()=>{
        const audio = audioRef.current;
        if(audio){
            audio.volume = volume / 100
        }
    }, [volume])

    const togglePlay = () =>{
        const audio = audioRef.current;
        if(!audio) return;
        if(audio.paused){
            audio.play();
            setIsPlaying(true);
        }else{
            audio.pause();
            setIsPlaying(false);
        };
    }

    const  prevTrack = () =>{
        const previousTrack = currentIndex -1;
        if(previousTrack < 0) return;
        setCurrentIndex(previousTrack);
        startTrack(queue[previousTrack])
    };

    const nextTrack = () => {
        const next = currentIndex + 1;
        if(next >= queue.length) return;
        setCurrentIndex(next);
        startTrack(queue[next]);
    }

    return(
        <PlayerContext.Provider value={{currentTrack, audioRef, isPlaying, recentlyPlayed, playTrack, togglePlay, nextTrack, prevTrack, queue, currentIndex, volume, setVolume}}>
            <audio ref={audioRef} />
            {children}
        </PlayerContext.Provider>
    )
}