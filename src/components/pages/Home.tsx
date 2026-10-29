import { iTunesSearchSong } from "../utils/iTunesSearchSong"
import type { Track } from "../contexts/PlayerContext"
import { useState } from "react";
import type { SearchSongType } from "../utils/iTunesSearchSong";
import { usePlayer } from "../hooks/usePlayer";

export default function Home(){
    const [tracks, setTrack] = useState<Track[]>([]);
    const { playTrack } = usePlayer()
    const searchSong: SearchSongType = {
        term: "Juice Wrld",
        limit: 8
    }
    const generate = async () => {
        try{
            const song = await iTunesSearchSong(searchSong);
            setTrack(song)
            console.log(song) 
        }catch (error) {
            console.error(error)
        }
    }
    return (
        <div>
            <div className=" custom-scrollbar mb-5 flex items-center overflow-x-auto flex-nowrap gap-3 pb-2">
                {tracks.map((t , i) => {
                    const {thumbnail, title, artist} = t 
                    return(
                        <div key={i} className="border border-line bg-white rounded-xl min-w-[140px] w-[140px] shrink-0 cursor-pointer" onClick={() => playTrack(t, tracks)}>
                            <img src={thumbnail!} className="block rounded-t-xl w-full h-[140px] aspect-square object-cover" />
                            <div className="p-1.5 leading-[1.4]">
                                <p className="text-[16px] truncate font-grotesk font-semibold leading-[1.2] text-aubergines">{title}</p>
                                <p className="text-ink-soft truncate text-[11px] font-semibold">{artist}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <button onClick={generate} className="px-7 cursor-pointer text-white rounded-full py-2.5 bg-aubergine">Generate</button>
        </div>
    )
}