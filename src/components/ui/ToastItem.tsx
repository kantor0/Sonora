





import { KindIcon } from "../utils/notificationKind";
import { useEffect } from "react";
import type { Toast } from "../contexts/ToastContext";
import { X } from "lucide-react";
import { useSettings } from "../hooks/useSettings";


interface ToastItemProps {
    toast: Toast,
    onDismiss: (id: string) => void
}

export default function ToastItem({toast, onDismiss}: ToastItemProps){
    const isError = toast.kind === "error";
    const duration = isError ? 4000 : 3000;
    const Icon = KindIcon[toast.kind];
    const {settings} = useSettings();
    const textStyle = settings.theme === "dark" ? "text-[#3a1f3d]" : "";

    useEffect(()=>{
        const timer = setTimeout(() => onDismiss(toast.id), duration);
        return () => clearTimeout(timer)
    }, [toast.id, duration, onDismiss]);
    
    return (
        <div role={isError ? "alert" : "status"} className={`animate-toast-in overflow-hidden rounded-lg text-white shadow-lg transition-all duration-300 motion-reduce:animate-none ${isError ? "bg-red-700" : "bg-ink"} ${toast.leaving ? "-translate-y-4 opacity-0" : ""}`}>
            <div className="flex items-center gap-2 px-4 py-3 text-sm font-semibold">
                <Icon size={18} className={`${!isError ? textStyle : ""} shrink-0`} />
                <span className={`flex-1 ${!isError ? textStyle : ""}`}>{toast.title}</span>
                <button type="button" aria-label="Dismiss notifications" onClick={() => onDismiss(toast.id)} className="shrink-0 cursor-pointer opacity-80 hover:opacity-100">
                    <X size={16} className={`${!isError ? textStyle : ""}`} />
                </button>
            </div>
            {/* timer bar shrinks over the same duration as the timer */}
            <div
                className="h-1 origin-left animate-toast-progress bg-white/40 motion-reduce:hidden"
                style={{animationDuration: `${duration}ms`}}   
            />
        </div>
    )
}