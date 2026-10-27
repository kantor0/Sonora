



import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ToastContext, type AppNotification, type ShowToastOptions, type Toast } from "./ToastContext";

interface Props{
    children: ReactNode
};

const STORAGE_KEY = "sonora-notifications";
const MAX_TOASTS = 3;
const MAX_NOTIFICATIONS = 30;

const loadNotifications = ():AppNotification[] =>{
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if(!saved) return [];
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : []
    } catch{
        return []
    }
}

export default function ToastProvider({children}: Props){
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [notifications, setNotifications] = useState<AppNotification[]>(loadNotifications);

    useEffect(()=>{
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
        } catch {
            throw new Error("Failed to store in LocalStorage")
        }
    }, [notifications, setNotifications]);

    const unreadCount = notifications.filter(n => !n.read).length;
    const EXIT_MS = 300;

    const dismiss = useCallback((id: string)=> {
        setToasts(prev => prev.map(t => (t.id === id ? {...t, leaving: true} : t)));
        setTimeout(()=>{
            setToasts(prev => prev.filter(t => t.id !== id))
        }, EXIT_MS)
    }, []);

    const showToast = useCallback((options: ShowToastOptions) => {
            const {title, description, kind = "info", persist = false} = options;
            const id = crypto.randomUUID();
            setToasts(prev => [...prev, { id, title, kind}].slice(-MAX_TOASTS));
            if(persist){
                setNotifications(prev => [{id, title, description, kind, createdAt: Date.now(), read: false}, ...prev].slice(0, MAX_NOTIFICATIONS))
            }
    }, []);

    const markAllRead = useCallback(() => {
        setNotifications(prev => prev.some(n => !n.read) ? prev.map(n => ({...n, read: true})) : prev)
    }, []) 

    const clearNotifications = useCallback(() => setNotifications([]), []);

    const markRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => (n.id === id ? {...n, read: true} : n)))
    }, [])

    return(
        <ToastContext.Provider value={{
            notifications, toasts, unreadCount, dismiss, showToast, markAllRead, clearNotifications, markRead
        }}>
            {children}
        </ToastContext.Provider>
    )
}