import { ChevronLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import{ useRef } from "react";
import { useUser } from "../hooks/useUser";
import AvatarImg from "../ui/AvatarImg";
import InputField from "../ui/InputField";
import { useToast } from "../hooks/useToast";
import Toggle from "../ui/Toggle";
import { useSettings } from "../hooks/useSettings";
import { validateDisplayName, validateUsername } from "../utils/validation";


interface FeaturesType{
    label: string,
    checked: boolean,
    title: string,
    description: string
}

function Features({label, checked, title, description}: FeaturesType){
    return(
        <div className="flex items-center justify-between border-b border-line pb-2.5">
            <div>
                <h3 className={`text-ink-soft font-semibold font-grotesk text-md`}>{title}</h3>
                <p className="text-sm text-ink-soft">{description}</p>
            </div>
            <Toggle label={label} checked={checked} onChange={() => {}} disabled />
        </div>
    )
}

const playbackFeatures: FeaturesType[] = [
    { label: "CrossFade (coming soon)", checked: false, title: "Crossfade", description: "Blend the end of one song into next" },
    { label: "Autoplay (coming soon)", checked: true, title: "Autoplay similar songs", description: "Keep the room going when your queue ends"},
    { label: "Offline mode (coming soon)", checked: false, title: "Offline mode", description: "Only play songs already downloaded"},
    {label: "AutoSave Youtube Songs (coming soon)", checked: true, title: "AutoSave Youtube Songs", description: "Turned on and your downloaded Youtube Songs get saved to 'Youtube Playlist'"}
]

export default function Settings(){
    const navigate = useNavigate();
    const {showToast} = useToast()
    const { handleAvatarUrl, user, setUser } = useUser();
    const FileInputRef = useRef<HTMLInputElement>(null);
    const { settings, updateSetting, resetSettings, isDefault } = useSettings();
    const {theme} = settings;

    const navigateToProfile = () =>{
        navigate("/profile")
    }

    const handleClick = () =>{
        if(FileInputRef.current){
            FileInputRef.current?.click()
        }
    };

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement );
        const trimmedUsername = String(formData.get("username")).trim();
        const trimmedDisplayName = String(formData.get("displayName")).trim();
       const displayNameResult = validateDisplayName(trimmedDisplayName);
       const usernameResult = validateUsername(trimmedUsername)
       if(displayNameResult.error){
        return showToast(displayNameResult.status!)
       }
        if(usernameResult.error){
        return showToast(usernameResult.status!)
       }
        
        const updatedUser = {
            username: trimmedUsername,
            displayName: trimmedDisplayName,
        }
        if(!user) return;
        const fields = ["username", "displayName"] as const;
        const labels = {username: "Username", displayName: "Display name"};
        const changed = fields.filter((field) => user[field] !== updatedUser[field]);

        if(changed.length === 0) {
            showToast({
                title: "No changes to save", kind: "info"
            })
            return;
        }

        setUser((prev) => prev ? {...prev, ...updatedUser} : prev );
        const title = changed.length === 2 ? "Username and display name changed" : `${labels[changed[0]]} changed`;
        const description = changed.map((field) => `${labels[field]} changed from "${user[field]}" to "${updatedUser[field]}".`).join(" ");
        showToast({
            title,
            description,
            kind: "saved"
        })
    }


    return (
        <div>
            {/* Top Info & Page Title */}
            <div className="space-y-3 mb-5">
                <div className="flex gap-1 text-ink-soft items-center font-bold text-sm">
                    <ChevronLeft size={21} className="cursor-pointer" onClick={navigateToProfile}/><span>Back to Profile</span>
                </div>
                <div className="space-y-1">
                    <p className="text-ink-soft text-sm font-semibold font-grotesk">MAKE IT YOURS</p>
                    <h2 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-bold font-grotesk text-3xl`}>Settings</h2>
                </div>
            </div>

            {/* Account seeting */}
            <form className="bg-paper border border-line rounded-xl p-6 mb-5" onSubmit={handleSubmit}>
                <h2 className={`${theme === "light" ? "text-aubergines" : "text-white"} font-semibold font-grotesk text-lg`}>Account</h2>
                <p className="text-sm text-ink-soft mb-4 -mt-1">Customize Your Profile User</p>

                {/* Edit AvatarUrl */}
                <div className="mb-4"> 
                    <div className="flex items-center space-x-4">
                        <div className="relative inline-block">
                            <AvatarImg size="md" clickable className="-mt-1.5" />
                            <div onClick={handleClick} className="bg-aubergine text-white p-1 rounded-full w-5.5 h-5.5 flex items-center absolute -bottom-1 right-0 cursor-pointer">
                                <Camera />
                                <input type="file" ref={FileInputRef} accept="image/*" onChange={(e)=> {
                                    const file = e.target.files?.[0];
                                    if(file) handleAvatarUrl(file)
                                }} className="hidden" />
                            </div>
                        </div>
                        <p className="text-ink-soft text-sm">Tap to change photo</p>
                    </div>
                </div>

                {/* input field */}
                <div className="space-y-5">
                    <InputField label="Display name" name="displayName" defaultValue={user?.displayName} className="font-semibold" textColor={`${theme === "light" ? "text-aubergine" : "text-white"}`} />
                    <InputField label="Username" name="username" defaultValue={user?.username} className="font-semibold" textColor={`${theme === "light" ? "text-aubergine" : "text-white"}`} />
                    <InputField label="User ID" defaultValue={user?.id} disabled className="text-ink-soft" textColor={`${theme === "light" ? "text-aubergine" : "text-white"}`} />
                    
                </div>
                <div>
                    <button className="mt-4 py-2 px-4 cursor-pointer bg-aubergines text-white rounded-lg" type="submit">Save changes</button>
                </div>
            </form>



            {/* Appearance Settings */}
            <div className="bg-paper border border-line rounded-xl p-6 mb-5">
                <h2 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold pb-1 font-grotesk text-lg border-b mb-3 border-line`}>Appearance</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold font-grotesk text-md`}>Dark mode</h3>
                        <p className="text-sm text-ink-soft">Easier on the eyes for late-night listening</p>
                    </div>
                    <div>
                        <Toggle label="Dark Mode" checked={settings.theme === "dark"} onChange={(on) => { updateSetting("theme", on ? "dark" : "light")}} />
                    </div>
                </div>
            </div>

            {/* Playback */}
            <div className="bg-paper border border-line rounded-xl p-6 mb-5">
                <h2 className={`text-ink-soft font-semibold font-grotesk text-lg mb-4`}>Playback - Coming Soon</h2>
                <div className="space-y-3">
                    {playbackFeatures.map((p, i) => {
                        const {title, description, checked, label} = p;
                        return (
                            <Features title={title} description={description} checked={checked} label={label} key={i} />
                        )
                    })}
                </div>
                <div className="mt-3 space-y-2">
                    <div>
                        <h3 className={`text-ink-soft font-semibold font-grotesk text-md`}>Local library folder</h3>
                        <p className="text-sm text-ink-soft">Where Sonora looks for on-device audio files </p>
                    </div>
                    <div className="space-y-3.5">
                        <InputField defaultValue="Music Folder" disabled className="text-ink-soft" textColor={`${theme === "light" ? "text-aubergine" : "text-white"}`} />
                        <button className=" py-2 px-4 cursor-pointer bg-aubergines text-white rounded-lg" type="button">Choose</button>
                    </div>
                </div>
            </div>

            {/* Privacy Policy */}
            <div className="bg-paper border border-line rounded-xl p-6 mb-5 space-y-6">
                <h2 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold font-grotesk text-lg mb-4 border-b pb-1.5 border-line`}>Privacy & data</h2>
                <div className="border-b border-line pb-3 flex items-center justify-between">
                    <div>
                        <h3 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold font-grotesk text-md`}>Data & storage</h3>
                        <p className="text-sm text-ink-soft">2.4 GB of 8 GB used for downloads and cache</p>
                    </div>
                    <button className=" py-1.5 px-7 font-semibold text-md cursor-pointer bg-cream-2 text-clayark rounded-lg mt-2" type="button">Clear data</button>
                </div>

                <div className="border-b border-line pb-3 flex items-center justify-between">
                    <div>
                        <h3 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold font-grotesk text-md`}>Privacy policy</h3>
                        <p className="text-sm text-ink-soft">How Sonora handles your listening & user data</p>
                    </div>
                    <button className=" py-1.5 px-7 font-semibold text-md cursor-pointer bg-cream-2 text-clayark rounded-lg mt-2" type="button">View privacy policy</button>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className={`${theme === "light" ? "text-aubergine" : "text-white"} font-semibold font-grotesk text-md`}>Reset Settings</h3>
                        <p className="text-sm text-ink-soft">Change your Settings back to default</p>
                    </div>
                    <button className=" py-1.5 px-7 font-semibold text-md cursor-pointer bg-cream-2 text-clayark rounded-lg mt-2" type="button" onClick={() =>{
                        if(isDefault){
                            showToast({
                                title: "Settings are already at default",
                                kind: "info"
                            });
                            return;
                        }
                        resetSettings();
                        showToast({
                            title: "Settings resetted",
                            description: `You resetted your Settings back to default, You're now on ${theme}Mode, Your volume is ${settings.defaultVolume} and so on....`,
                            kind: "info"
                        })
                    }}>Reset</button>
                </div>
            </div>

            <div className="text-center m-4">
                <p className="text-sm text-ink-soft">About Sonora: v1.1.34 ~ Created by Kantoro</p>
            </div>

            
            <div>
                
            </div>
        </div>
    )
}