




import { ChevronRight, ListPlus, Heart, SkipBack, Play, SkipForward } from "lucide-react"
import { useState } from 'react'


export default function RightSidebar(){
    const [isNowPlaying] = useState(false)
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
                <div className="w-full h-60 rounded-lg bg-gray-200 flex items-center justify-center bg-gray">
                    {isNowPlaying && (
                        <img src="" alt="" className="w-full h-full object-cover rounded-lg" />
                    )}
                </div>
            </div>
            
            {/* Info */}
            <div className="flex items-center justify-between p-2">
                {/* Song Name and Artist */}
                <div>
                    <p className="text-lg font-bold text-cream-2 py-1` font-grotesk">Song Name</p>
                    <p className="text-sm font-cursive text-gray-950 font-extrabold">Song Artist</p>
                </div>
                <button className="cursor-pointer"><Heart /></button>
            </div>

            {/* progress Bar */}
            <div className="mb-2">
                {/* Replace with Progress Component */}
                <input type="range" value="0" className="w-full accent-ink"/>
                {/* Current Time */}
                <div className="flex items-center justify-between px-1 text-sm">
                    {/* Current Time */}
                    <span>0:00</span>
                    {/* Full Time */}
                    <span>0:00</span>
                </div>
            </div>

            {/* Audio Buttons */}
            <div className="flex justify-around items-center text-gray-300">
                <button className="font-extrabold cursor-pointer"><SkipBack /></button>
                <button className="w-12 h-12 rounded-full cursor-pointer grid place-items-center bg-white text-gray-700"><Play /></button>
                <button className="cursor-pointer"><SkipForward /></button>
            </div>

            {/* Volume */}
            <div>
                
            </div>
        </div>
    )
}