export type FeedDTO = {
    creator: string;
    title: string;
    pubDate: string;
    contentSnippet: string;
    link: string;
    guid: string;
    [key: string]: string;
}