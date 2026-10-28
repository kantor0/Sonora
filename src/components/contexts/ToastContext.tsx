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
    read: boolean,
    pinned?: boolean,
    locked?: boolean,
    link?: string
}

export interface ShowToastOptions{
    title: string,
    description ?: string,
    kind ?: NotificationKind,
    persist ?: boolean
    pinned?: boolean,
    locked?: boolean,
    link?: string
}

export interface ToastContextType {
    notifications: AppNotification[],
    toasts: Toast[],
    unreadCount: number,
    hasNew: boolean,
    markBellSeen: () => void;
    dismiss: (id: string) => void
    showToast: (options:ShowToastOptions) => void,
    markRead: (id: string) => void,
    markAllRead: () => void,
    clearNotifications: () => void,
    toggleRead: (id: string) => void
    togglePin: (id: string) => void
    deleteNotification: (id: string) => void
}

export const ToastContext = createContext<ToastContextType | null>(null);