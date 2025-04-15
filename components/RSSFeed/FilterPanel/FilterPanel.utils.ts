import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, milliSeconds: number, dependencyArr: string[]) => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, milliSeconds);

        return () => {
            clearTimeout(handler);
        };
    }, [dependencyArr]);

    return debouncedValue;
};