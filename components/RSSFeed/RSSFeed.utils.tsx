import { FeedDTO } from "./RSSFeed.types";
import { ChipObj as Subscription } from '../FeedChoser/FeedChoser.types';
import ArticleSummary from "../ArticleSummary/ArticleSummary";
import { NoDataWrapper, SkeletonLoader } from "./RSSFeed.styled";
import { UseQueryResult } from "@tanstack/react-query";
import { ErrorLabel } from "../FeedChoser/FeedChoser.styled";


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

export const getArticlesSummary = (
    showOnlyFavourites: boolean,
    search: string,
    favourites: FeedDTO[],
    feedQuery: UseQueryResult<FeedDTO[], Error>,
    handleToggleFavourite: (favouriteArticle: FeedDTO, isChecked: boolean) => void,
    onShowDetails: (articleToShow: FeedDTO) => void
) => {
    if (feedQuery.error) {
        return (
            <ErrorLabel>{feedQuery.error.message}</ErrorLabel>
        )
    }

    if (feedQuery.isLoading) {
        return (
            Array.from(Array(5), (_, index) => (
                <SkeletonLoader key={`loader_${index}`} />
            ))
        )
    }
    const datasource = showOnlyFavourites ? favourites : feedQuery.data;
    const filteredArticles = !!search.trim() ? datasource?.filter((article) => article.title.toLowerCase().includes(search.toLowerCase())) : datasource;
    const sortedArticles = getSortedItems(filteredArticles);
    return (sortedArticles !== undefined && sortedArticles.length > 0)
        ? (
            sortedArticles.map((article) => (
                <ArticleSummary
                    key={article.guid}
                    article={article}
                    toggleAddToFavourite={handleToggleFavourite}
                    isFavourite={favourites.some((fav) => fav.guid === article.guid)}
                    onShowDetails={onShowDetails}
                />
            ))
        ) : (
            <NoDataWrapper>
                No data
            </NoDataWrapper>
        )
}

export const getSortedItems = (feeds: FeedDTO[] | undefined) => {
    if (feeds) {
        return feeds.sort((a, b) => b.isoDate.localeCompare(a.isoDate));
    }
    return undefined;
}