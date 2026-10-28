


import AccountStep from "../Layouts/AccountStep";
import AuthWelcomeStep from "../Layouts/AuthWelcomeStep";
import { useNavigate } from "react-router-dom";
import { useSessionStorage } from "../hooks/useSessionStorage";
//import { useState } from "react";
import { useToast } from "../hooks/useToast";
import type { User } from "../contexts/UserContext";
import { useUser } from "../hooks/useUser";
import ArtistStep from "../Layouts/ArtistStep";
import GenreStep from "./GenreStep";
import MoodStep from "./MoodStep";
export interface Data{
    username: string
    displayName: string
}
interface RightAuthViewType{
    handleTerms: () => void
}
export default function RightAuthView({handleTerms}: RightAuthViewType){
    const [step, setStep] = useSessionStorage<number>("auth-step", 0)
    const [account, setAccount] = useSessionStorage<Data | null>("welcome-account", null);
    const [artistSelected, setArtistSelected] = useSessionStorage<string[]>("welcome-artists", []);
    const [genreSelected, setGenreSelected] = useSessionStorage<string[]>("welcome-genre", []);
    const [moodSelected, setMoodSelected] = useSessionStorage<string[]>("welcome-mood", []);
    const navigate = useNavigate()
    const { setUser } = useUser()
    const { showToast } = useToast();
    const keys: string[] = ["auth-step", "welcome-account", "welcome-artists", "welcome-genre", "welcome-mood"];

    const handleArtistNext = () => {
        if(artistSelected.length !== 0){
            setStep(3)
        }else{
            showToast({ title: "You haven't selected an artist yet", kind: "info" })
        }
    }

    const handleGenreNext = () => {
        if(genreSelected.length !== 0){
            setStep(4)
        }else{
            showToast({ title: "You haven't selected a genre yet", kind: "info" })
        }
    }

    const handleMoodNext = () => {
        if(moodSelected.length !== 0){
            if(!account) return 
            const user: User = {
                id: crypto.randomUUID(),
                username: account.username,
                displayName: account.displayName,
                avatarUrl: null,
                favoriteArtist: artistSelected,
                moods: moodSelected,
                genre: genreSelected,
                createdAt: Date.now()
            };
            keys.forEach((k) => sessionStorage.removeItem(k));
            setUser(user);
            navigate("/")
            setTimeout(()=>{
                showToast({
                    title: "Welcome to Sonora",
                    description: "Tap the button to see what you can do.",
                    kind: "info",
                    persist: true,
                    pinned: true,
                    locked: true,
                    link: "/getting-started"
                })
        }, 400)
        }else{
            showToast({ title: "You haven't selected a mood yet", kind: "info" })
        }
    }

    const handleMoodSkip = () =>{
        if(!account) return;
        const user: User = {
            id: crypto.randomUUID(),
            username: account.username,
            displayName: account.displayName,
            avatarUrl: null,
            favoriteArtist: artistSelected,
            moods: moodSelected,
            genre: genreSelected,
            createdAt: Date.now()
        };
        keys.forEach((k) => sessionStorage.removeItem(k));
        setUser(user);
        navigate("/")
    }
    
    
    return(
        <>
        {step === 0 && <AuthWelcomeStep onNext={() => setStep(1)} handleTerms={handleTerms}/>}
        {step === 1 && <AccountStep onBack={() => setStep(0)} onNext={(data) => { setStep(2); setAccount(data); }} defaultValues={account} />}
        {step === 2 && <ArtistStep onBack={() => setStep(1)} onNext={handleArtistNext} selected={artistSelected} onChange={setArtistSelected} onSkip={() => setStep(3)}/> }
        {step === 3 && <GenreStep onBack={() => setStep(2)} onNext={handleGenreNext} selected={genreSelected} onChange={setGenreSelected} onSkip={() => setStep(4)} /> }
        {step === 4 && <MoodStep onBack={() => setStep(3)} onNext={handleMoodNext} selected={moodSelected} onChange={setMoodSelected} onSkip={handleMoodSkip} />}
        <div>
            <p className="text-ink-soft text-sm pt-4 text-center -mb-7">By continuing, you agree to keep Sonora a thoughtful place for music and people.</p>
        </div>
        </>
    )
}