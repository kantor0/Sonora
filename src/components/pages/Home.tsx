import { iTunesSearchSong } from "../utils/iTunesSearchSong"
import type { Track } from "../contexts/PlayerContext"
import { useState } from "react";
import type { SearchSongType } from "../utils/iTunesSearchSong";
import { usePlayer } from "../hooks/usePlayer";
import { useSettings } from "../hooks/useSettings";
import { Music, ArrowRight } from "lucide-react";

export default function Home(){
    //const [tracks, setTrack] = useState<Track[]>([]);
    const { currentTrack, recentlyPlayed, playTrack } = usePlayer();
    //const { settings } = useSettings();
    //const isLight = settings.theme === 'light'
    const imageSrc = currentTrack?.thumbnail
    const title = currentTrack?.title
    const artistName = currentTrack?.artist
    /* const searchSong: SearchSongType = {
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
    } */
    return (
        <div className="space-y-8">
            <header className="leading-[2.5]">
                <p className="text-ink-soft text-[13px] uppercase font-semibold tracking-wide">Your Listening room</p>
                <h1 className="text-3xl md:text-5xl text-ink font-bold font-grotesk">Stay in the sound.</h1>
            </header>
            <div className="mt-8 flex flex-wrap gap-5">
                <div className="bg-aubergine flex-2 py-10 px-5 rounded-xl flex items-center gap-5 max-w-175">
                    <div className={`hidden md:flex w-30 h-30 rounded-xl bg-clay items-center justify-center overflow-hidden`}>
                        {imageSrc ? (
                            <img src={imageSrc} alt={title} className="w-full h-full object-cover rounded-xl" />
                        ): (
                            <Music size={32} className="text-white" />
                        )}
                    </div>
                    <div className="-mt-1 space-y-1">
                        <p className="uppercase text-red-300 font-grotesk font-semibold tracking-wider text-sm">Now Playing</p>
                        <p className="text-white text-[35px] font-bold tracking-wider font-serif">{title ? title : "Nothing yet"}</p>
                        <p className="text-ink-soft text-[18px] font-semibold">{artistName ? artistName : "Search for something to start listening"}</p>
                    </div>
                </div>

                <div className="bg-paper w-85 min-w-75 border border-line shrink-0 py-10 px-5 rounded-xl">
                    <p className="text-ink-soft text-[12px] font-bold tracking-widest font-grotesk uppercase ">A little Nudge</p>
                    <p className="text-clayark font-bold text-[30px] tracking-wider font-serif">Song Info</p>
                </div>
            </div>
            
            {/*Add Playlist */}
            <div></div>

            {/* Recently Played */}
            <div>
                <div className="flex justify-between items-center space-y-4">
                    <h1 className="text-aubergine font-semibold font-grotesk text-lg">Recently played</h1>
                    <button>
                        <p className="flex gap-1 items-center text-clay">See All <span><ArrowRight size={16} /></span></p>
                    </button>
                </div>
                {recentlyPlayed.length !== 0 ? (
                    <div className=" custom-scrollbar mb-5 flex items-center overflow-x-auto flex-nowrap gap-3 pb-2">
                        {recentlyPlayed.map((r) => {
                            const { thumbnail, title, artist } = r;
                            return(
                                <div key={title} className="border border-line bg-white rounded-xl min-w-35 w-35 shrink-0 cursor-pointer" onClick={() => playTrack(r, recentlyPlayed)}>
                                    <img src={thumbnail!} className="block rounded-t-xl w-full h-35 aspect-square object-cover" />
                                    <div className="p-1.5 leading-[1.4]">
                                        <p className="text-[16px] truncate font-grotesk font-semibold leading-[1.2] text-aubergines">{title}</p>
                                        <p className="text-ink-soft truncate text-[11px] font-semibold">{artist}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="text-center text-2xl font-bold text-ink font-grotesk">
                        <p>No Recent Music....</p>
                    </div>
                )}
            </div>
        </div>
    )
}











/*             <div className=" custom-scrollbar mb-5 flex items-center overflow-x-auto flex-nowrap gap-3 pb-2">
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
            <button onClick={generate} className="px-7 cursor-pointer text-white rounded-full py-2.5 bg-aubergine">Generate</button> */