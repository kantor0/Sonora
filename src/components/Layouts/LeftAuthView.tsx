import { Sparkle, BookUser } from "lucide-react";











export default function LeftAuthView(){
    return (
        <div className="hidden auth-left bg-aubergine text-[#f6ece3] p-14 relative overflow-hidden md:flex flex-col justify-between gap-2 md:gap-0">
           {/* Brand */}
           <div className="flex items-center gap-3 text-xl relative z-1">
               <span className="rounded-full w-8 h-8 grid place-items-center text-white text-2xl bg-clay">♪</span>
               <span className="text-md">Sonora</span>
           </div>
           {/* HeadLine */}
           <div className="relavive z-1 max-w-110">
               <p className="mb-3.5 font-semibold uppercase text-[#e7b6a9] text-sm tracking-normal">Your listening Room</p>
               <p className="text-5xl leading-12 mb-3.5 font-bold">A listening room for the songs that find you.</p>
               <p className="text-[#d8c9d6]">Your music, your circle, your pace.</p>
           </div>
           {/* Promise */}
           <div className="promise flex flex-col gap-1.5 space-y-1">
               <div className="uppercase text-[#e7b6a9] text-xs tracking-wider flex items-center justify-between mb-3">
                   <span>A little promise</span>
                   <span><Sparkle size={16} /></span>
               </div>
               <blockquote className="text-lg font-semibold leading-5.5 font-grotesk">"There's always another song that feels like it was waiting for you."</blockquote>
               <div className="flex items-center gap-1.5">
                   <span className="w-2 h-2 bg-clay mt-0.5 rounded-full inline-block"></span>
                   <span className="text-sm tracking-wider">Private by default · social by choice</span>
               </div>
               <div className="flex items-center">
                <BookUser size={20} />
                <span>Created By Kantoro</span>
                </div>
           </div>
        </div> 
    )
}