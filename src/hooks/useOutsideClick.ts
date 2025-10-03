import { ModuleSource } from "module";
import { useEffect, useRef } from "react";

export const useOutsideClick = (handler: () => void) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClick = (e:MouseEvent ) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
               handler();    
            }
        }

        document.addEventListener('click', handleClick, true);
        return () => document.removeEventListener('click', handleClick, true)
    }, [handler])
    return ref;
}

    