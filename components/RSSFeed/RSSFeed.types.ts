export type FeedDTO = {
    creator: string;
    title: string;
    pubDate: string;
    contentSnippet: string;
    content: string;
    link: string;
    guid: string;
    [key: string]: string;
}