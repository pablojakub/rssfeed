'use client'
import { useState } from 'react';
import { ArticleSummaryWrapper, StyledHeader, StyledRssWrapper, StyledTitleHeaderWrapper } from './RSSFeed.styled';
import FeedChoser, { STORED_CHIPS_KEY } from '../FeedChoser/FeedChoser';
import { ChipObj as Subscription } from '../FeedChoser/FeedChoser.types';
import { useQuery } from '@tanstack/react-query';
import { getArticlesSummary, getFeedArticlesByFeedUrls } from './RSSFeed.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';
import { Tooltip } from 'react-tooltip';
import { FeedDTO } from './RSSFeed.types';
import ArticleDetails from './ArticleDetails/ArticleDetails';
import FilterPanel from './FilterPanel/FilterPanel';

const FAVOURITE_ARTICLES_KEY = 'favourite_articles';

const RSSFeed = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(getInitialValueFromLocalStore<Subscription[]>(STORED_CHIPS_KEY));
    const [favourites, setFavourites] = useState<FeedDTO[]>(getInitialValueFromLocalStore<FeedDTO[]>(FAVOURITE_ARTICLES_KEY));
    const [showOnlyFavourite, setShowOnlyFavourite] = useState(false);
    const [detailsArticle, setDetailsArticle] = useState<FeedDTO | null>(null);
    const [searchValue, setSearchValue] = useState('');

    const feedQuery = useQuery({
        queryKey: ['FEED_SUBSCRIPTIONS', subscriptions],
        queryFn: () => getFeedArticlesByFeedUrls(subscriptions),
        refetchInterval: 60000,
        refetchOnWindowFocus: false,
        enabled: subscriptions.length > 0,
    });

    const handleToggleFavourite = (favouriteArticle: FeedDTO, isChecked: boolean) => {
        if (isChecked) {
            setFavourites((prev) => {
                const newFavourites = [...prev, favouriteArticle];
                setValueToLocalStore(FAVOURITE_ARTICLES_KEY, newFavourites);
                return newFavourites;
            })
        } else {
            setFavourites((prev) => {
                const newFavourites = prev.filter((fav) => fav.guid !== favouriteArticle.guid);
                setValueToLocalStore(FAVOURITE_ARTICLES_KEY, newFavourites);
                return newFavourites;
            })
        }
    }

    const onShowDetails = (articleToShow: FeedDTO) => {
        setDetailsArticle(articleToShow);
    }

    const isTouchDevice = typeof window !== "undefined" && (
        'ontouchstart' in window || navigator.maxTouchPoints > 0
    );

    return (
        <>
            <StyledRssWrapper>
                <StyledTitleHeaderWrapper>
                    <StyledHeader>RSS Feed Reader 📖</StyledHeader>
                </StyledTitleHeaderWrapper>
                <FeedChoser
                    subscriptions={subscriptions}
                    onSubscriptionChange={(selectedSubscriptions) => setSubscriptions(selectedSubscriptions)}
                />
                <FilterPanel
                    showOnlyFavourites={showOnlyFavourite}
                    onToggleShowFavourites={(showFavourites) => setShowOnlyFavourite(showFavourites)}
                    onSearchChange={(search) => setSearchValue(search)}
                />
                <ArticleSummaryWrapper>
                    {getArticlesSummary(
                        showOnlyFavourite,
                        searchValue,
                        favourites,
                        feedQuery,
                        handleToggleFavourite,
                        onShowDetails,
                    )}
                    {isTouchDevice === false && (
                        <Tooltip
                            id='info'
                            style={{
                                position: 'absolute',
                                color: 'black',
                                boxShadow: '0px 5px 7px 5px rgba(0,0,0,0.10)',
                                borderRadius: '5px',
                                padding: '0.5rem',
                                zIndex: 2,
                            }}
                        />)}
                </ArticleSummaryWrapper>
            </StyledRssWrapper>
            {detailsArticle && (
                <ArticleDetails
                    articleTitle={detailsArticle.title}
                    articleDetails={detailsArticle['content:encoded']}
                    articleLink={detailsArticle.link}
                    articleSummary={detailsArticle.content}
                    onClose={() => setDetailsArticle(null)}
                />
            )}
        </>


    );
};

export default RSSFeed;