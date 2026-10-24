import { VolumeX, Volume1, Volume2 } from 'lucide-react';

interface VolumeProps {
    volume: number
}

export default function VolumeIcon({volume}: VolumeProps){
    if(volume === 0) return <VolumeX />
    if(volume <= 0.5) return <Volume1 />
    return <Volume2 />
}