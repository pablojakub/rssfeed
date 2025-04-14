import { FeedDTO } from "./RSSFeed.types";
import { ChipObj as Subscription } from '../FeedChoser/FeedChoser.types';


export const getFeedArticlesByFeedUrls = async (subscriptions: Subscription[]): Promise<FeedDTO[]> => {
    const subscriptionUrls = subscriptions.map((sub) => sub.label);
    const response = await fetch('/api/rss', {
        method: 'POST',
        body: JSON.stringify(subscriptionUrls)
    });
    if (response.ok === false) {
        throw new Error('Something went wrong during fetching articles');
    }
    return response.json();
}

export const getSortedItems = (feeds: FeedDTO[]) => {
    return feeds.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
}