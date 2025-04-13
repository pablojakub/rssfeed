export function getInitialValueFromLocalStore<T>(localStoreKey: string): T {
    if (typeof window !== 'undefined') {
        const localStorageValue = localStorage.getItem(localStoreKey);
        if (localStorageValue) {
            return JSON.parse(localStorageValue) as T;
        }
        return [] as T;
    }
    return [] as T;
}

export function setValueToLocalStore<T>(localStoreKey: string, value: T) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(localStoreKey, JSON.stringify(value));
    }
}