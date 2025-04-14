// pages/api/rss.ts
import { sortFeedItems } from '@/components/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import RSSParser from 'rss-parser';

export default async function getRSSFeedArticles(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parser = new RSSParser();
        const subscriptions: string[] = JSON.parse(req.body) as string[];

        const feeds = await Promise.all(
            subscriptions.map(subs => parser.parseURL(subs))
        );
        const allItems = feeds.flatMap(feed => feed.items);
        const sortedItems = sortFeedItems(allItems);

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).json(sortedItems);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
}