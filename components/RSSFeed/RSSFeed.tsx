'use client'
import { useState } from 'react';
import { ArticleSummaryWrapper, SkeletonLoader, StyledHeader, StyledRssWrapper, StyledTitleHeaderWrapper } from './RSSFeed.styled';
import FeedChoser, { STORED_CHIPS_KEY } from '../FeedChoser/FeedChoser';
import { ChipObj as Subscription } from '../FeedChoser/FeedChoser.types';
import { useQuery } from '@tanstack/react-query';
import { ErrorLabel } from '../FeedChoser/FeedChoser.styled';
import { getFeedArticlesByFeedUrls } from './RSSFeed.utils';
import { getInitialValueFromLocalStore } from '../utils';
import ArticleSummary from '../ArticleSummary/ArticleSummary';
import { Tooltip } from 'react-tooltip';

const RSSFeed = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(getInitialValueFromLocalStore<Subscription[]>(STORED_CHIPS_KEY));

    const feedQuery = useQuery({
        queryKey: ['FEED_SUBSCRIPTIONS', subscriptions],
        queryFn: () => getFeedArticlesByFeedUrls(subscriptions),
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
        enabled: subscriptions.length > 0,
    })

    return (
        <StyledRssWrapper>
            <StyledTitleHeaderWrapper>
                <StyledHeader>RSS Feed Reader</StyledHeader>
            </StyledTitleHeaderWrapper>
            <FeedChoser
                initialSubscriptions={subscriptions}
                onSubscriptionChage={(selectedSubscriptions) => setSubscriptions(selectedSubscriptions)}
            />
            <ArticleSummaryWrapper>
                {feedQuery.isError && <ErrorLabel>{feedQuery.error.message}</ErrorLabel>}
                {feedQuery.isFetching && Array.from(Array(5), (_, index) => (
                    <SkeletonLoader key={`loader_${index}`} />
                ))}
                {feedQuery.data &&
                    feedQuery.data.map((article) => (
                        <ArticleSummary
                            key={article.guid}
                            article={article}
                        />
                    ))
                }
                <Tooltip
                    id='bookmark-info'
                    style={{
                        position: 'absolute',
                        color: 'black',
                        boxShadow: '0px 5px 7px 5px rgba(0,0,0,0.10)',
                        borderRadius: '5px',
                        padding: '0.5rem',
                        zIndex: 2,
                    }}
                />
            </ArticleSummaryWrapper>
        </StyledRssWrapper>
    );
};

export default RSSFeed;