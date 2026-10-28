import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, X, Pin, Ellipsis } from 'lucide-react';
import { useNotifications } from '../hooks/useToast';
import type { AppNotification } from '../contexts/ToastContext';
import { KindIcon } from '../utils/notificationKind';
import { timeAgo } from '../utils/timeAgo';
import { useToast } from '../hooks/useToast';

type Tab = "all" | "unread"
export default function Notification(){
    const navigate = useNavigate();
    const { showToast } = useToast()
    const { notifications, markRead, markAllRead, togglePin, deleteNotification, clearNotifications, markBellSeen, toggleRead, unreadCount} = useNotifications()
    const [tab, setTab] = useState<Tab>("all");
    const [menuId, setMenuId ] = useState<string | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        markBellSeen()
    }, [markBellSeen]);
    
    const selected = notifications.find((n) => n.id === selectedId) ?? null
    const visible = notifications.filter((n) => tab === "all" ||  !n.read).sort((a, b) => Number(!!b.pinned) - Number(!!a.pinned) || b.createdAt - a.createdAt);

    function openNotification(n: AppNotification){
        markRead(n.id);
        setSelectedId(n.id)
        dialogRef.current?.showModal()
    }

    function clearNotif(){
        clearNotifications();
        showToast({
            title: "Notfications cleared",
            kind: "info",
        })
    }

    function markAll(){
        markAllRead();
        showToast({
            title: "All caught up!",
            kind: "info",
        })
    }

    function closeDialog() {
        dialogRef.current?.close()
    }
    const SelectedIcon = selected ? KindIcon[selected.kind] : null;
    return (
        <div>
            <div className="mt-2 -ml-2 mb-5 flex justify-between items-center">
                <button type="button" onClick={() => navigate(-1)} aria-label="Back" className="flex items-center text-ink-soft font-bold cursor-pointer"><ChevronLeft />Back</button>
                {unreadCount !== 0 && <button type="button" onClick={markAll} className="md:hidden text-ink rounded-full bg-cream-2 px-4.5 py-1.5 font-semiboldtext-sm">Mark all as read</button>}
            </div>
            <header className="flex flex-col gap-4">
                <div>
                    <p className="text-ink-soft uppercase text-xs font-bold font-grotesk">The Good Noise</p>
                    <h1 className="text-ink text-5xl font-semibold tracking-normal">Notifications</h1>
                </div>
                <div className="flex items-center flex-wrap gap-2 justify-between">
                    <div role="tablist" className="flex gap-5.5 justify-between">
                        {(["all", "unread"] as const).map((t) => (
                            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className="rounded-full bg-cream-2 px-4.5 py-1.5 font-semibold text-ink uppercase text-xs cursor-pointer hover:bg-paper aria-selected:bg-aubergine aria-selected:text-white transition-colors">
                                {t === "all" ? "All activity" : "Unread"}
                            </button>
                        ))}
                    </div>
                    {unreadCount !== 0 && <button type="button" onClick={markAll} className="hidden md:block text-ink cursor-pointer hover:text-clay">Mark all as read</button>}
                </div>
            </header>

            <div className="mt-4">
                {visible.length === 0 ? (
                    <p className="mx-auto text-ink font-bold text-xl text-center mt-10">
                        <span>{tab === "unread" ? "No unread notifications. You're all caught up." : "You're all caught up. No notifications yet."}</span>
                    </p>
                ) : (
                    <ul className="space-y-3.5">
                        {visible.map((n) => {
                            const Icon = KindIcon[n.kind]
                            return (
                                <li key={n.id} className='relative flex items-center bg-paper border border-line py-2 px-2 rounded-xl gap-3'>
                                    <button type="button" onClick={() => openNotification(n)} className='flex flex-1 cursor-pointer items-center gap-3 text-left'>
                                        <span className="bg-line w-8 h-8 rounded-full grid place-items-center"><Icon className="text-ink" /></span>
                                        <div>
                                            <p className="flex items-center gap-1">
                                                <span className="text-ink font-semibold font-grotesk">{n.title}</span>
                                                {n.pinned && <Pin size={14} aria-label="Pinned" className="text-ink" />}
                                            </p>
                                            <p className="text-ink-soft font-semibold font-cursive text-sm">{timeAgo(n.createdAt)}</p>
                                        </div>
                                        {!n.read && (
                                            <span className="ml-auto h-2 w-2 rounded-full bg-red-500" aria-label="Unread" />
                                        )}
                                    </button>
                                    
                                    {/* Menu Button */}
                                    <button type="button" aria-label="More actions" aria-expanded={menuId === n.id} onClick={() => setMenuId(menuId === n.id ? null : n.id)} className="cursor-pointer">
                                        <Ellipsis />
                                    </button>

                                    {/* Menu dropDown */}
                                    {menuId === n.id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setMenuId(null)} />
                                            <ul className="absolute right-0 top-full z-20 rounded-lg bg-cream p-4 shadow">
                                                <li>
                                                    <button type="button" onClick={() => {toggleRead(n.id); setMenuId(null)}} className="text-ink hover:bg-[#3A1F3D]/10 cursor-pointer font-semibold py-2 pr-2 w-full">
                                                        {n.read ? "Mark as unread" : "Mark as read"}
                                                    </button>
                                                </li>
                                                {!n.locked && (
                                                    <>
                                                        <li>
                                                            <button type="button" onClick={() => { togglePin(n.id); setMenuId(null)}} className="text-ink hover:bg-[#3A1F3D]/10 cursor-pointer font-semibold py-2 pr-2 w-full">
                                                                {n.pinned ? "Unpin" : "Pinned"}
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button type="button" onClick={() => {deleteNotification(n.id); setMenuId(null)}} className="text-ink hover:bg-[#3A1F3D]/10 cursor-pointer font-semibold py-2 pr-2 w-full">
                                                                Delete
                                                            </button>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </>
                                    )}
                                </li>
                            )
                        })}
                    </ul>
                )}
                {tab === "all" ? (
                    visible.length !== 0 && (
                        <button type="button" onClick={clearNotif} className="text-ink rounded-lg mt-5 bg-cream-2 px-4.5 py-1.5 font-semibold">Clear all</button>
                    )
                ) : (
                    visible.length !== 0 && (
                        <button type="button" onClick={markAllRead} className="text-ink rounded-lg mt-5 bg-cream-2 px-4.5 py-1.5 font-semibold text-sm">Mark all as read</button>
                    )
                )}
                

                {/* DIALOG */}
                <dialog ref={dialogRef} onClose={() => setSelectedId(null)} className="m-auto w-[90vw] max-w-md rounded-2xl bg-cream p-6 text-ink backdrop:black/50" onClick={(e) => { if(e.target === e.currentTarget) closeDialog()}}>
                    {selected && SelectedIcon && (
                        <div>
                            <div className="flex items-center justify-between">
                                <SelectedIcon />
                                <button type="button" onClick={closeDialog} aria-label='Close' className="cursor-pointer">
                                    <X />
                                </button>
                            </div>
                            <h2 className="text-3xl mt-2 font-bold font-serif text-center">{selected.title}</h2>
                            <p className="text-sm text-right font-cursive text-ink-soft mt-1">{timeAgo(selected.createdAt)}</p>
                            {selected.description && <p className="text-ink-soft font-semibold text-center whitespace-pre-line">{selected.description}</p>}
                            {selected.link && (
                                <button type="button" onClick={() => {closeDialog(); navigate(selected.link!)}} className='text-white w-full rounded-lg mt-5 bg-aubergine px-4.5 py-1.5 cursor-pointer font-semibold'>
                                    Open
                                </button>
                            )}
                        </div>
                    )}
                </dialog>
            </div>
        </div>
    )
}