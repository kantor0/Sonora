



interface ToggleProps{
    checked: boolean,
    onChange: (checked: boolean) => void,
    label: string,
    disabled ?: boolean
}

export default function Toggle({checked, onChange, label, disabled = false}: ToggleProps){
    return (
        <button type="button" role="switch" aria-checked={checked} aria-label={label} disabled={disabled} onClick={() => onChange(!checked)} className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${checked ? "bg-clay" : "bg-cream-2"}`}>
            <span className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
        </button>
    )
}