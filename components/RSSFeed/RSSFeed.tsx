'use client'

import { useEffect, useState } from 'react';
import { interval, switchMap, catchError, of, from, startWith, Observable, Subscription } from 'rxjs';
import { isRSSFeedResponse, RSSFeedState, RSSItem } from './RSSFeed.types';
import { StyledHeader, StyledRssWrapper } from './RSSFeed.styled';
import FeedChoser from '../FeedChoser/FeedChoser';

const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://techcrunch.com/feed/';

const RssFeed = () => {
    const [RssFeedState, setRssFeedState] = useState<RSSFeedState>({
        state: 'LOADING',
        items: [],
    });
    console.log('🚀 ~ RssFeed ~ RssFeedState:', RssFeedState);

    useEffect(() => {
        const subscription: Subscription = interval(60000).pipe(
            startWith(0),
            switchMap(() =>
                from(fetch('/api/rss', { method: 'POST', body: JSON.stringify(['abc']) }))
                    .pipe(
                        switchMap((response: Response) => {
                            if (!response.ok) {
                                throw new Error('Network response was not ok')
                            }
                            return from(response.json()) as Observable<{ items: RSSItem[] }>;
                        }),
                        catchError((error: Error) => of({ error: error.message }))
                    )
            )
        ).subscribe({
            next: (data) => {
                if (isRSSFeedResponse(data)) {
                    setRssFeedState({ state: 'READY', items: data.items });
                    return;
                }
                throw new Error('Invalid response format');
            },
            error: (err: Error) => {
                setRssFeedState({ state: 'ERROR', error: err.message });
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <StyledRssWrapper>
            <StyledHeader>Your RSS Feed</StyledHeader>
            <FeedChoser />
            {RssFeedState.state === 'ERROR' && <div>Error: {RssFeedState.error}</div>}
            {RssFeedState.state === 'LOADING' && <div>Loading...</div>}
        </StyledRssWrapper>
    );
};

export default RssFeed;