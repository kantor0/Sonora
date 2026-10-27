



import { createContext } from "react";

export type Theme = "light" | "dark";

export interface Settings {
    theme: Theme,
    autoSave: boolean,
    autoPlaySimilar: boolean,
    offlineMode: boolean,
    defaultVolume: number
};

export const defaultSettings: Settings = {
    theme: "light",
    autoPlaySimilar: true,
    autoSave: true,
    offlineMode: false,
    defaultVolume: 70,
}

export interface SettingsContextType{
    settings: Settings,
    updateSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
    isDefault: boolean,
    resetSettings: () => void
}

export const SettingsContext = createContext<SettingsContextType | null>(null);
