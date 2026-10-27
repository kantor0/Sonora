



import { createContext } from 'react';
import type { ChangeEvent, ReactNode, Dispatch, SetStateAction } from 'react';

export interface User{
    id: string,
    username: string,
    displayName: string,
    avatarUrl: string | null,
    favoriteArtist?: string[],
    moods?: string[]
}

export interface UserProviderProps{
    children: ReactNode
}

export interface UserContextType{
    user: User | null,
    setUser: Dispatch<SetStateAction<User | null>>
    handleAvatarUrl: (file: File) => void,
    handleUserChange: (e: ChangeEvent<HTMLInputElement>) => void,
}

export const UserContext = createContext<UserContextType | null>(null);