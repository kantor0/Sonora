import Greeting from "../utils/getGreeting";
import { useUser } from "../hooks/useUser";
import { useNotifications } from "../hooks/useToast";
import { Bell } from "lucide-react";
import AvatarImg from "../ui/AvatarImg";
import { useNavigate } from "react-router-dom";

/* interface User{
    id: string,
    displayName: string,
    userName: string,
    avatarUrl: string | null
} */

export default function Topbar(){
    const {unreadCount} = useNotifications()
    const navigate = useNavigate();
    const { user } = useUser()
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: "numeric"
    });
    const formattedDate: string = formatter.format(now)
    const name = user ? user.displayName?.split(" ")[0] : "Guest";
    const greeting = Greeting() + " " + name;

    const handleClickToNotification = () => {
        navigate("/notification")
    }


    return(
        <div className="flex pt-4 pb-1 px-5.5 items-center justify-between">
            <div className="flex flex-col text-ink text-sm space-x-1 md:block">
                <span className="text-ink-soft font-grotesk">{formattedDate} / </span> <span className="font-semibold">{greeting}</span>
            </div>

            <div className="gap-5 flex items-center">
                <span className="relative cursor-pointer" onClick={handleClickToNotification}>
                    <Bell className="text-ink-soft" />
                    {unreadCount > 0 && (
                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-red-600" />
                    )}
                </span>
                <AvatarImg size="sm" />
            </div>

        </div>
    )
}