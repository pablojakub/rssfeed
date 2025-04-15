import { FeedDTO } from "./RSSFeed/RSSFeed.types";

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

export const sortFeedItems = (feeds: Partial<FeedDTO>[]) => {
    return feeds.sort((a, b) => {
        if (a.isoDate && b.isoDate) {
            return b.isoDate.localeCompare(a.isoDate);
        } else if (a.isoDate) {
            return -1;
        } else if (b.isoDate) {
            return 1;
        } else {
            return 0;
        }
    });
}

