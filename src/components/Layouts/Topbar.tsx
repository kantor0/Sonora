import Greeting from "../utils/getGreeting";
import { useUser } from "../hooks/useUser";


import AvatarImg from "../ui/AvatarImg";

/* interface User{
    id: string,
    displayName: string,
    userName: string,
    avatarUrl: string | null
} */

export default function Topbar(){
    const { user } = useUser()
    const now = new Date()
    const formatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        month: 'long',
        day: "numeric"
    });
    const formattedDate: string = formatter.format(now)
    const name = user ? user.displayName?.split(" ")[0] : "Guest";
    //const image = user.avatarUrl;
    const greeting = Greeting() + " " + name;
    return(
        <div className="flex pt-4.5 pb-1 px-4.5 items-center justify-between">
            <div className="text-ink text-sm space-x-1">
                <span className="text-ink-soft">{formattedDate} / </span> <span className="font-semibold">{greeting}</span>
            </div>

            <div>
                <AvatarImg size="sm" />
            </div>

        </div>
    )
}