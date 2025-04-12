// pages/api/rss.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import RSSParser from 'rss-parser';

const RSS_URL = 'https://www.nasa.gov/technology/feed/';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log('🚀 ~ handler ~ req:', req.body);
    try {
        const parser = new RSSParser();
        const feed = await parser.parseURL('https://www.nasa.gov/technology/feed/');

        res.setHeader('Content-Type', 'application/xml');
        res.status(200).send(feed);
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to fetch RSS feed' });
    }
}