



import { createContext } from 'react';
import type { ReactNode, RefObject, Dispatch, SetStateAction } from 'react';;

export interface Track{
    id: string,
    title: string,
    artist: string,
    thumbnail: string | null,
    audioUrl: string,
};

export interface PlayerProviderProps{
    children: ReactNode
}

export interface PlayerContextType {
    currentTrack: Track | null,
    isPlaying: boolean,
    volume: number,
    setVolume: Dispatch<SetStateAction<number>>,
    recentlyPlayed: Track[],
    audioRef: RefObject<HTMLAudioElement | null >,
    queue: Track[],
    currentIndex: number,
    playTrack: (track: Track, list?: Track[])=> void,
    togglePlay: () => void,
    nextTrack: () => void,
    prevTrack: () => void,

}

export const PlayerContext = createContext<PlayerContextType | null>(null);

