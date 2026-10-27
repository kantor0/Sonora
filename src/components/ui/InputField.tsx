import type { ChangeEvent } from "react";

interface Props{
    label ?: string,
    textColor ?: string,
    name ?: string,
    value?: string,
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    disabled ?: boolean,
    inputType?: string
    inputBackground?: string,
    defaultValue?: string,
    className?: string,
    required ?: boolean
}

export default function InputField ({label, textColor="text-aubergine", name, value, onChange, inputType="text", disabled = false, inputBackground="bg-cream", defaultValue, className="", required = false}: Props){
    return (
        <label className={`flex ${textColor} flex-col gap-1.5 text-sm`}>
            {label && (
                <span className="font-semibold">{label}</span>
            )}
            <input type={inputType} name={name} value={value} disabled={disabled} onChange={onChange} className={`${inputBackground} p-2.5 rounded-xl pl-3.5 border font-sans ${className} border-line`} defaultValue={defaultValue} required={required} />
        </label>
    )
}

