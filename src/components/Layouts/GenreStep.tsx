import { ChevronLeft } from "lucide-react";
import { GENRE } from "../data/onBoarding";
import { useToast } from "../hooks/useToast";

interface GenreStepProps{
    selected: string[]
    onChange: (selected: string[]) => void
    onBack: () => void
    onNext: () => void;
    onSkip: () => void 
}

export default function GenreStep({onBack, onNext, onSkip, selected, onChange}: GenreStepProps){
    const { showToast } = useToast()
    const toggle = (name: string) =>{
        onChange(selected.includes(name) ? selected.filter(n => n !== name) : [...selected, name])
    }
    const resetSelected = () => {
        if(!selected.length){
            return showToast({title: "Selection is already cleared", kind: "info"})
        }
        onChange([]);
        showToast({title: "Restted selection", kind: "info"})
    }
    return (
        <div>
            <button onClick={onBack} className="flex items-center text-ink-soft font-bold cursor-pointer mt-5 mb-5"><ChevronLeft size={18} /> <span>Back</span></button>
            <div className="space-y-1.5 max-w-100 w-full mb-3.5">
                <p className="uppercase text-clayark font-grotesk text-sm font-semibold tracking-wide">Tune your room with your favorite artists</p>
                <h3 className="text-4xl text-ink font-semibold font-serif mb-3.5">Who do you already love?</h3>
                <p className="text-ink-soft">Pick a few. You can change them whenever your taste changes.</p>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-between items-center mb-4 border-b border-line pb-2.5">
                <p className={`rounded-full px-4 py-2 text-sm font-semibold ${selected.length === 0 ? "border-line bg-paper text-ink" : "border-aubergine bg-aubergine text-white"} inline-block`}>{selected.length === 0 ? "0" : String(selected.length).padStart(2, "0")} / {GENRE.length} selected</p>
                <button type="button" onClick={resetSelected} aria-label="Clear selection" className="rounded-full border border-line px-4 py-2 text-sm font-semibold bg-paper hover:bg-[#f2faf5] hover:border-ink-soft cursor-pointer text-ink">Reset selection</button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
                {GENRE.map(name => {
                    const isSelected = selected.includes(name);
                    return (
                        <button key={name} type="button" aria-pressed={isSelected} onClick={() => toggle(name)} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${isSelected ? "border-aubergine bg-aubergine text-white" : "border-line bg-paper text-ink hover:border-clay"}`} >
                            {name}
                        </button>
                    )
                })}
            </div>
            <div className="flex justify-center flex-col space-y-3 mb-3">
                <button type="button" onClick={onNext} className="rounded-xl cursor-pointer bg-aubergine px-8 py-3 font-bold text-lg font-grotesk text-white w-full">Next</button>
                <button type="button" onClick={onSkip} className="text-ink-soft cursor-pointer text-lg font-bold font-grotesk">Skip →</button>
            </div>
        </div>
    )
}