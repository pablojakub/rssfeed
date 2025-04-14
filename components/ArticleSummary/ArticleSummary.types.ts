import { FeedDTO } from "../RSSFeed/RSSFeed.types";

export type ArticleSummaryProps = {
    article: FeedDTO;
    toggleAddToFavourite: (favouriteArticle: FeedDTO, isChecked: boolean) => void;
    isFavourite: boolean;
    onShowDetails: (articleToShow: FeedDTO) => void;
};