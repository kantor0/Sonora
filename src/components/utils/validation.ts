
import type { ShowToastOptions } from "../contexts/ToastContext";





interface ValidationResult{
    error: boolean
    status?: ShowToastOptions
}

export function validateDisplayName(str: string): ValidationResult{
    const trimmed = str.trim();
    const regex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
    if(!trimmed){
        return {error: true, status: { title: "Your display name can not be left Empty. Please Fill it up", kind: "error" }}
    }else if(trimmed.length < 3 || trimmed.length > 30){
        const length = trimmed.length < 3 ? "short" : "long";
        return {error: true, status: { title: `Your display name length is too ${length}. The min and max length both consist of 3 and 30. Alphabet only`, kind: "error" }}
    }else if(!regex.test(trimmed)){
        return {error: true, status: { title: "Display name must only be words of alphabet and space. Double spacing is not allowed", kind: "error"}}
   }
   return {error: false}
}

export function validateUsername(str: string): ValidationResult{
    const trimmed = str.trim()
    const regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if(!trimmed){
        return {error: true, status: { title: "Username can not be left Empty. Please Fill it up", kind: "error" }}
    }else if(trimmed.length < 3 || trimmed.length > 24){
        const length = trimmed.length < 3 ? "short" : "long";
        return {error: true, status: { title: `Username length is too ${length}. The min and max length both consist of 3 and 24 Alphanumeric. Note: Starting with an alphabet`, kind: "error" }}
    }else if(!regex.test(trimmed)){
        return {error: true, status: { title: "Username should start with an alphabet and continued by either numbers, alphabet or symbols. Note: Symbols available are '_'", kind: "error" }}
   }
   return {error: false}
}

