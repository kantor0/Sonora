




export function timeAgo(timestamp: number){
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if(seconds < 60) return "Just now";
    const minutes = Math.floor(seconds / 60)
    if(minutes < 60) return `${minutes}m ago`
    const hour = Math.floor(minutes / 60)
    if(hour < 24) return `${hour}hr ago`;
    const day = Math.floor(hour / 24);
    if(day === 1) return `Yesterday`;
    if(day < 7) return `${day}d ago`;
    const week = Math.floor(day / 7);
    if(week < 4) return `${week}wk ago`;
    const month = Math.floor(week / 4);
    if(month < 12) return `${month}mo ago`;
    const year = Math.floor(month / 12);
    return `${year}yr ago`
}