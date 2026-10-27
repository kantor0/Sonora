import { useToast } from "../hooks/useToast";




import ToastItem from "./ToastItem";

export default function ToastViewport(){
    const {toasts, dismiss} = useToast();
    return(
        <div className="pointer-events-none absolute left-1/2 top-4 z-50 h-16 w-80 max-w-[90vw] -translate-x-1/2">
            {toasts.map((t, index) => {
                const depth = toasts.length - 1 - index;
                return(
                    <div key={t.id} className="pointer-events-auto absolute inset-x-0 top-0 origin-top transition-all duration-300" style={{
                        transform: `translateY(${depth * 10}px) scale(${1 - depth * 0.05})`,
                        zIndex: 10 - depth,
                        opacity: depth === 0 ? 1 : 0.85,
                    }}>
                        <ToastItem toast={t} onDismiss={dismiss} />
                    </div>
                )
            })}
        </div>
    )
}