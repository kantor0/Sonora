import { useCallback, useState } from "react";
import type { ReactNode } from "react";
import { ToastContext, type AppNotification, type ShowToastOptions, type Toast } from "./ToastContext";
import { useLocalStorage } from "../hooks/useLocalStorage";
interface Props{
    children: ReactNode
};

const STORAGE_KEY = "sonora-notifications";
const MAX_TOASTS = 4;
const MAX_NOTIFICATIONS = 30;



export default function ToastProvider({children}: Props){
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [notifications, setNotifications] = useLocalStorage<AppNotification[]>(STORAGE_KEY, []);
    const [bellSeenAt, setBellSeentAt] = useLocalStorage<number>("sonora-bell-seen", 0);
    const unreadCount = notifications.filter(n => !n.read).length;
    const EXIT_MS = 400;
    const hasNew = notifications.some((n) => n.createdAt > bellSeenAt)
    const markBellSeen = useCallback(()=> setBellSeentAt(Date.now()), [setBellSeentAt])

    const dismiss = useCallback((id: string)=> {
        setToasts(prev => prev.map(t => (t.id === id ? {...t, leaving: true} : t)));
        setTimeout(()=>{
            setToasts(prev => prev.filter(t => t.id !== id))
        }, EXIT_MS)
    }, []);

    const showToast = useCallback((options: ShowToastOptions) => {
            const {title, description, kind = "info", persist = false, pinned = false, locked = false, link} = options;
            const id = crypto.randomUUID();
            setToasts(prev => [...prev, { id, title, kind}].slice(-MAX_TOASTS));
            if(persist){
                setNotifications(prev => [{id, title, description, kind, createdAt: Date.now(), read: false, pinned, locked, link}, ...prev].slice(0, MAX_NOTIFICATIONS))
            }
    }, [setNotifications]);

    const markAllRead = useCallback(() => {
        setNotifications(prev => prev.some(n => !n.read) ? prev.map(n => ({...n, read: true})) : prev)
    }, [setNotifications]) ;

    const toggleRead = useCallback((id: string) =>{
        setNotifications((prev) => prev.map((n) => n.id === id ? {...n, read: !n.read} : n))
    }, [setNotifications])

    const clearNotifications = useCallback(() => setNotifications([]), [setNotifications]);

    const markRead = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => (n.id === id ? {...n, read: true} : n)))
    }, [setNotifications]);

    const togglePin = useCallback((id: string) => {
        setNotifications(prev => prev.map(n => n.id === id && !n.locked ? {...n, pinned: !n.pinned} : n))
    }, [setNotifications])

    const deleteNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id || n.locked))
    }, [setNotifications]);

    return(
        <ToastContext.Provider value={{
            notifications, toasts, unreadCount, dismiss, showToast, markAllRead, clearNotifications, markRead, toggleRead, togglePin, deleteNotification, hasNew, markBellSeen
        }}>
            {children}
        </ToastContext.Provider>
    )
}