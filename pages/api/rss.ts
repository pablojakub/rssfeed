// pages/api/rss.ts
import { sortFeedItems } from '@/components/utils';
import type { NextApiRequest, NextApiResponse } from 'next';
import RSSParser from 'rss-parser';

export default async function getRSSFeedArticles(req: NextApiRequest, res: NextApiResponse) {
    try {
        const parser = new RSSParser();
        const subscriptions: string[] = JSON.parse(req.body) as string[];

        const feeds = await Promise.all(
            subscriptions.map(subs =>
                parser.parseURL(subs)
                    .catch(error => {
                        console.error(`Failed to parse URL ${subs}:`, error);
                        return { items: [] };
                    })
            )
        );
        const allItems = feeds.flatMap(feed => feed.items);
        const guids = new Set();
        const uniqueItems = allItems.filter(item => {
            if (!item.guid || guids.has(item.guid)) {
                return false;
            }
            guids.add(item.guid);
            return true;
        });
        const sortedItems = sortFeedItems(uniqueItems);

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).json(sortedItems);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
}