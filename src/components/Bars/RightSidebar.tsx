
import { ChevronRight, ListPlus, Heart, SkipBack, Play, SkipForward, Music, Pause } from "lucide-react";
import { usePlayer } from "../hooks/usePlayer";
import SeekBar from "../player/SeekBar";
import VolumeBar from "../player/VolumeBar";
import VolumeIcon from "../ui/VolumeIcon";

export default function RightSidebar(){
    const { volume, currentTrack, isPlaying } = usePlayer()
    const imageSrc = currentTrack?.thumbnail;
    const trackTitle = currentTrack?.title;
    const trackArtist = currentTrack?.artist;
    console.log(isPlaying)
    return(
        <div className="text-white">
            {/* Now Playing Plus Queue */}
            <div className=" gap-6 flex justify-around p-5.5 text-lg font-semibold items-center mb-5.5">
                <button className="cursor-pointer"><ChevronRight /></button>
                <p> Now Playing </p>
                <button className="cursor-pointer"><ListPlus /></button>
            </div>

            {/* Music Thumbnail */}
            <div className="p-2 mb-5.5">
                <div className="w-full h-60 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                    {imageSrc ? (
                        <img src={imageSrc} alt={trackTitle} className="w-full h-full object-cover rounded-lg" />
                    ) : (
                        <Music size={80} className="text-neutral-400" />
                    )}
                </div>
            </div>
            
            {/* Info */}
            <div className="flex items-center justify-between p-2">
                {/* Song Name and Artist */}
                <div>
                    <p className="text-md font-bold text-cream-2 font-grotesk">{trackTitle ? trackTitle : "Not Playing"}</p>
                    <p className="text-sm font-sans text-cream-2">{trackArtist ? trackArtist : "Select a song to start"}</p>
                </div>
                <button className="cursor-pointer"><Heart /></button>
            </div>

            {/* progress Bar */}
            <div className="mb-3 px-1">
                {/* <input type="range" value="0" className="w-full accent-ink"/> */}
                <SeekBar showTimes />
            </div>

            {/* Audio Buttons */}
            <div className="flex justify-around items-center text-gray-300">
                <button className="font-extrabold cursor-pointer"><SkipBack /></button>
                <button className="w-12 h-12 rounded-full cursor-pointer grid place-items-center bg-white text-gray-700">{!isPlaying ? <Play /> : <Pause />}</button>
                <button className="cursor-pointer"><SkipForward /></button>
            </div>

            {/* Volume */}
            <div className="mt-3.5 flex items-center justify-around gap-1.5 px-1">
                <VolumeIcon volume={volume} />
                <VolumeBar />
            </div>

            {/* Settings for music */}
        </div>
    )
}