import { useStorage } from "./useStorage";

export function useSessionStorage<T>(key: string, initial: T){
    return useStorage(key, initial, sessionStorage)
}