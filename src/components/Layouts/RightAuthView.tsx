


import AccountStep from "../Layouts/AccountStep";
import AuthWelcomeStep from "../Layouts/AuthWelcomeStep";
import { useEffect, useState } from "react";
import ArtistStep from "../Layouts/ArtistStep";
interface Data{
    username: string
    displayName: string
}
interface RightAuthViewType{
    handleTerms: () => void
}



export default function RightAuthView({handleTerms}: RightAuthViewType){
    const [step, setStep] = useState<number>(() => {
        try {
            const savedStep = sessionStorage.getItem("auth-step");
            if(!savedStep) return 0
            const parsed = Number(savedStep);
            return parsed
        } catch{
            return 0
        }
    });
    
    useEffect(() => {
        try {
            sessionStorage.setItem("auth-step", JSON.stringify(step))
        } catch{
            console.warn(`Could not save auth-step to sessionStorage`)
        }
    }, [step])
    
    const [account, setAccount] = useState<Data | null>(null);
    const [selected, setSelected] = useState<string[]>([]);
    console.log(selected)
    console.log(account)
    return(
        <>
        {step === 0 && <AuthWelcomeStep onNext={() => setStep(1)} handleTerms={handleTerms}/>}
        {step === 1 && <AccountStep onBack={() => setStep(0)} onNext={(data) => { setStep(2); setAccount(data) } } />}
        {step === 2 && <ArtistStep onBack={() => setStep(1)} onNext={(selected) => { setSelected(selected); setStep(3) } } /> }
        <div>
            <p className="text-ink-soft text-sm pt-4 text-center -mb-7">By continuing, you agree to keep Sonora a thoughtful place for music and people.</p>
        </div>
        </>
    )
}