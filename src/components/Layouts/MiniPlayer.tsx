import { usePlayer } from "../hooks/usePlayer";
import { Music, Heart, Pause, Play } from 'lucide-react';
import SeekBar from "../player/SeekBar";




export default function MiniPlayer(){
    const { currentTrack, isPlaying } = usePlayer()
    const imageSrc = currentTrack?.thumbnail;
    const trackTitle = currentTrack?.title;
    const trackArtist = currentTrack?.artist;
    return (
        <div>
            <div className="flex justify-between items-center p-1.5">
                <div className="flex gap-2">
                    <div className="w-12.5 h-12.5 rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                        {imageSrc ? (
                            <img src={imageSrc} alt={trackTitle} className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <Music size={20} className="text-neutral-400" />
                        )}
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-md font-bold text-white font-grotesk">{trackTitle ? trackTitle : "Not Playing"}</p>
                        <p className="text-sm font-sans text-white">{trackArtist ? trackArtist : "Select a song to start"}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="cursor-pointer"><Heart size={20} className="text-white" /></button>
                    <button className="w-9 h-9 rounded-full cursor-pointer grid place-items-center bg-clay text-white">{!isPlaying ? <Play /> : <Pause />}</button>
                </div>
            </div>
            <div className="px-1">
                <SeekBar />
            </div>
        </div>
    )
}