interface Props{
    value: number,
    onChange: (value: number) => void,
    label: string,
    className?: string,
    fillClassName?: string
}

export default function Progress({ value, onChange, label, className="", fillClassName= "bg-ink"}: Props){
    const safeValue = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;
    return(
        <div className={`group relative h-4 w-full cursor-pointer overflow-x-hidden ${className}`}>

            {/* Background Line */}
            <div className={`absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-white`}></div>

            {/* Filled Line */}
            <div className={`absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full ${fillClassName}`} style={{width: `${safeValue}%` }} />

            {/* Dot: Appears when you hover the bar */}
            <div className={`absolute top-1/2 h-2.5 w-2.5 -translate-x-1/6 -translate-y-1/2 rounded-full opacity-0 transition-opacity group-hover:opacity-100 ${fillClassName}`} style={{left: `${safeValue}%` }} />

            {/* Invisible Range: Handles All Clicking and dragging */}
            <input type="range" min={0} max={100} step="any" value={safeValue} aria-label={label} onChange={(e) => onChange(Number(e.target.value))} className="absolute inset-0 h-full w-full cursor-pointer opacity-0 overflow-hidden" />
        </div>
    )
}