import { useEffect, useState } from "react";

function isPlainObject(v: unknown): v is Record<string, unknown>{
    return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function useLocalStorage<T>(key: string, initialValue: T){
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            if(saved === null) return initialValue;
            const parsed: unknown = JSON.parse(saved);
            if(isPlainObject(initialValue) && isPlainObject(parsed)){
                return {...initialValue, ...parsed} as T
            }
            return parsed as T
        } catch {
            return initialValue
        }
    });

    useEffect(() =>{
        try{
            localStorage.setItem(key, JSON.stringify(value));
        }catch{
            console.warn(`Could not save "${key}" to localStorage`)
        }
    }, [key, value]);
    return [value, setValue] as const
}