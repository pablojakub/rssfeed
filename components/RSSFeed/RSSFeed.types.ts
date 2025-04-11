export type RSSItem = {
    title: string;
    link: string;
    pubDate: string;
    description: string;
}

export type RSSFeedState = {
    state: 'READY',
    items: RSSItem[];
} | {
    state: 'LOADING',
    items: [];
} | {
    state: 'ERROR',
    error: string;
}