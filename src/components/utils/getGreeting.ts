export default function getGreeting(): string{
    const hour = new Date().getHours();
    if(hour < 12) return "good morning";
    if(hour < 17) return "good afternoon";
    return "good evening"
}