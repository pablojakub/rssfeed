'use client'
import { useState } from 'react';
import { ArticleSummaryWrapper, FilterWrapper, SkeletonLoader, StarWrapper, StyledHeader, StyledRssWrapper, StyledTitleHeaderWrapper } from './RSSFeed.styled';
import FeedChoser, { STORED_CHIPS_KEY } from '../FeedChoser/FeedChoser';
import { ChipObj as Subscription } from '../FeedChoser/FeedChoser.types';
import { useQuery } from '@tanstack/react-query';
import { ErrorLabel, Label } from '../FeedChoser/FeedChoser.styled';
import { getFeedArticlesByFeedUrls } from './RSSFeed.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';
import ArticleSummary from '../ArticleSummary/ArticleSummary';
import { Tooltip } from 'react-tooltip';
import { FeedDTO } from './RSSFeed.types';
import { FilledStar, OutlineStar } from '../ArticleSummary/Bookmark/Bookmark';
import ArticleDetails from './ArticleDetails/ArticleDetails';

const FAVOURITE_ARTICLES_KEY = 'favourite_articles';

const RSSFeed = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>(getInitialValueFromLocalStore<Subscription[]>(STORED_CHIPS_KEY));
    const [favourites, setFavourites] = useState<FeedDTO[]>(getInitialValueFromLocalStore<FeedDTO[]>(FAVOURITE_ARTICLES_KEY));
    const [showOnlyFavourite, setShowOnlyFavourite] = useState(false);
    const [detailsArticle, setDetailsArticle] = useState<FeedDTO | null>(null);

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
                <FilterWrapper>
                    <Label>
                        Only favourite articles:
                    </Label>
                    <StarWrapper onClick={() => setShowOnlyFavourite(!showOnlyFavourite)} >
                        {showOnlyFavourite ? <FilledStar /> : <OutlineStar />}
                    </StarWrapper>
                </FilterWrapper>
                <ArticleSummaryWrapper>
                    {feedQuery.isError && <ErrorLabel>{feedQuery.error.message}</ErrorLabel>}
                    {feedQuery.isLoading && Array.from(Array(5), (_, index) => (
                        <SkeletonLoader key={`loader_${index}`} />
                    ))}
                    {feedQuery.data && showOnlyFavourite === false &&
                        feedQuery.data.map((article) => (
                            <ArticleSummary
                                key={article.guid}
                                article={article}
                                toggleAddToFavourite={handleToggleFavourite}
                                isFavourite={favourites.some((fav) => fav.guid === article.guid)}
                                onShowDetails={(articleToShow) => setDetailsArticle(articleToShow)}
                            />
                        ))
                    }
                    {showOnlyFavourite && (
                        favourites.map((fav) => (
                            <ArticleSummary
                                key={fav.guid}
                                article={fav}
                                toggleAddToFavourite={handleToggleFavourite}
                                isFavourite
                                onShowDetails={(articleToShow) => setDetailsArticle(articleToShow)}
                            />
                        ))
                    )}
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