import { createContext } from "react";







export type NotificationKind = "liked" | "info" | "playlist" | "saved" | "error"

export interface Toast{
    id: string,
    title: string,
    kind: NotificationKind,
    leaving?: boolean
}

export interface AppNotification extends Toast{
    description ?: string,
    createdAt: number,
    read: boolean
}

export interface ShowToastOptions{
    title: string,
    description ?: string,
    kind ?: NotificationKind,
    persist ?: boolean
}

export interface ToastContextType {
    notifications: AppNotification[],
    toasts: Toast[],
    unreadCount: number,
    dismiss: (id: string) => void
    showToast: (options:ShowToastOptions) => void,
    markRead: (id: string) => void,
    markAllRead: () => void,
    clearNotifications: () => void,
}

export const ToastContext = createContext<ToastContextType | null>(null);