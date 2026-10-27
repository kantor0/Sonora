




import { ScrollText, Check } from "lucide-react";
interface AuthWelcomeStepType{
    onNext: () => void
    handleTerms: () => void
}
export default function AuthWelcomeStep({onNext, handleTerms}: AuthWelcomeStepType){
    return (
        <div>
            <h1 className="center text-center text-5xl mb-10 text-clay font-semibold font-serif">Welcome to <span className="text-clayark">Sonora</span></h1>
            <div className="max-w-100 w-full space-y-2">
                <p className="uppercase text-clayark font-grotesk text-sm font-semibold tracking-wide">A Softer Way in</p>
                <h3 className="text-5xl text-ink font-semibold font-serif mb-3.5">Come in, the room is warm.</h3>
                <p className="text-ink-soft font-semibold">Find your next repeat, share what you're hearing, and keep your own little corner of music together.</p>
                <div className="my-8 space-y-3">
                    <button onClick={onNext} className="bg-aubergine text-white px-8 py-3 font-sans font-bold cursor-pointer hover:bg-aubergines md:text-lg rounded-xl w-full">Create your account →</button>
                    <button onClick={handleTerms} className="bg-paper text-ink border-line border px-8 py-3 font-sans font-bold cursor-pointer text-md rounded-xl w-full flex items-center gap-1"><ScrollText />Read about our Terms and Conditions</button>
                </div>
            </div>
            <div className="flex flex-wrap gap-1 space-y-1 mb-1">
                <span className="inline-flex items-center gap-1 text-ink bg-paper border-line border rounded-3xl px-4 py-2 text-sm"><Check size={18} /> Save your listening</span>    
                <span className="inline-flex items-center gap-1 text-ink bg-paper border-line border rounded-3xl px-4 py-2 text-sm"><Check size={18} /> Search for your favorite songs</span>    
                <span className="inline-flex items-center gap-1 text-ink bg-paper border-line border rounded-3xl px-4 py-2 text-sm"><Check size={18} />Youtube link into audio</span>    
                <span className="inline-flex items-center gap-1 text-ink bg-paper border-line border rounded-3xl px-4 py-2 text-sm"><Check size={18} />Listen from your Local files</span>    
            </div> 
        </div>        
    )
}