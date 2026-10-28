import { ChevronLeft, UserRound, AtSign } from "lucide-react";
import { validateDisplayName, validateUsername } from "../utils/validation";
import { useToast } from "../hooks/useToast";
import type { Data } from "./RightAuthView";

interface AccountStepProps{
    defaultValues: Data | null
    onBack: () => void
    onNext: (data: {username: string, displayName: string}) => void
}

export default function AccountStep({onBack, onNext, defaultValues}: AccountStepProps){
    const { showToast } = useToast()
    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const username = String(formData.get("username")).trim();
        const displayName = String(formData.get("displayName")).trim();
        const usernameResult = validateUsername(username);
        const displayNameResult = validateDisplayName(displayName);
        if(displayNameResult.error){
            return showToast(displayNameResult.status!)
        }
        if(usernameResult.error){
            return showToast(usernameResult.status!)
        }
        onNext({username: username, displayName: displayName})
    }

    return (
        <div>
            <button onClick={onBack} className="flex items-center text-ink-soft font-bold cursor-pointer mt-5 mb-5"><ChevronLeft size={18} /> <span>Back</span></button>
            <div className="space-y-2 max-w-120 w-full">
                <p className="uppercase text-clayark font-grotesk text-sm font-semibold tracking-wide">Make a listening room</p>
                <h3 className="text-4xl text-ink font-semibold font-serif mb-3.5">Start with your name.</h3>
                <form className="flex flex-col space-y-4 md:space-y-9" onSubmit={handleSubmit}>
                    <label className="text-aubergines font-semibold text-sm ">
                        Display name
                        <div className="flex bg-paper items-center text-sm mt-1 px-4 text-ink-soft py-3 rounded-2xl border-line border gap-2 focus-within:border-clay focus-within:ring-1 focus-within:ring-clay">
                            <UserRound size={16} />
                            <input type="text" name="displayName" defaultValue={defaultValues?.displayName ?? ""} placeholder="John Doe" className="py-1 active placeholder:text-ink-soft text-ink" />
                        </div>
                    </label>
                    <label className="text-aubergines font-semibold text-sm ">
                        Username
                        <div className="flex bg-paper text-sm items-center mt-1 px-4 text-ink-soft py-3 rounded-2xl border-line border gap-2 focus-within:border-clay focus-within:ring-1 focus-within:ring-clay">
                            <AtSign size={16} />
                            <input type="text" name="username" defaultValue={defaultValues?.username ?? ""} placeholder="johndoe_28" className="py-1 active placeholder:text-ink-soft text-ink" />
                        </div>
                    </label>
                    <label className="flex items-center gap-2 text-ink text-sm">
                        <input type="checkbox" name="agreement" defaultChecked required />
                        I agree to Sonora's community guidelines and privacy promise.
                    </label>
                    <button type="submit" className="bg-aubergine text-white px-8 py-3 font-sans font-bold cursor-pointer hover:bg-aubergines md:text-lg rounded-xl w-full">Create your account →</button>
                </form>
            </div>
        </div>
    )
}