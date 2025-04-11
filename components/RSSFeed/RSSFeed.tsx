'use client'

import { useEffect, useState } from 'react';
import { interval, switchMap, catchError, of, from, startWith } from 'rxjs';
import { RSSFeedState } from './RSSFeed.types';
import { StyledHeader, StyledRssWrapper } from './RSSFeed.styled';

const RSS_URL = 'https://cors-anywhere.herokuapp.com/https://techcrunch.com/feed/';

const RssFeed = () => {
    const [RssFeedState, setRssFeedState] = useState<RSSFeedState>({
        state: 'LOADING',
        items: [],
    });

    const [feed, setFeed] = useState(null);
    console.log('🚀 ~ RssFeed ~ feed:', feed);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Create observable with polling every 60 seconds
        const subscription = interval(60000).pipe(
            startWith(0),
            switchMap(() =>
                from(fetch('/api/rss')).pipe(
                    switchMap(response => {
                        if (!response.ok) throw new Error('Network response was not ok');
                        return from(response.json());
                    }),
                    catchError(error => of({ error: error.message }))
                )
            )
        ).subscribe({
            next: data => {
                if (data.error) {
                    setError(data.error);
                } else {
                    setFeed(data.items);
                    setError(null);
                }
                setLoading(false);
            },
            error: err => {
                setError(err.message);
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <StyledRssWrapper>
            <StyledHeader>Your RSS Feed</StyledHeader>
            {RssFeedState.state === 'ERROR' && <div>Error: {RssFeedState.error}</div>}
            {RssFeedState.state === 'LOADING' && <div>Loading...</div>}
        </StyledRssWrapper>
    );
};

export default RssFeed;