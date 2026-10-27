import { useCallback, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { defaultSettings, SettingsContext } from "./SettingsContext";
import type { Settings } from "./SettingsContext";
import type { ReactNode } from "react";

interface SettingsProviderProps{
    children: ReactNode
}


export default function SettingsProvider({children}: SettingsProviderProps){
    const [settings, setSettings] = useLocalStorage<Settings>("sonora-settings", defaultSettings);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", settings.theme === "dark");
    }, [settings.theme]);

    const updateSetting = useCallback(
        <K extends keyof Settings>(key: K, value: Settings[K]) => {
            setSettings(prev => ({
                ...prev, [key]: value
            }))
        },
        [setSettings]
    );

    const isDefault = (Object.keys(defaultSettings) as (keyof Settings)[]).every(
        (key) => settings[key] === defaultSettings[key]
    )

    const resetSettings = useCallback(() =>{
        setSettings(defaultSettings)
    }, [setSettings]);

return( 
        <SettingsContext.Provider value={{settings, updateSetting, resetSettings, isDefault}}>
            {children}
        </SettingsContext.Provider>
)
}