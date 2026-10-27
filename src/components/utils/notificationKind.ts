import type { NotificationKind } from "../contexts/ToastContext";
import type { LucideIcon } from "lucide-react";
import { Heart, ListPlus, CircleCheck, Info, CircleAlert } from "lucide-react";
export const KindIcon: Record<NotificationKind, LucideIcon> = {
    liked: Heart,
    playlist: ListPlus,
    info: Info,
    saved: CircleCheck,
    error: CircleAlert
}