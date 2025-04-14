'use client'
import Bookmark from './Bookmark/Bookmark';
import { format } from 'date-fns';
import { ArticleBibliography, ArticleContent, ArticleHeader, ReadMoreButton, ReadMoreButtonWrapper, StyledArticleSummaryWrapper } from './ArticleSummary.styled';
import { ArticleSummaryProps } from './ArticleSummary.types';
import { Message } from '../RSSFeed/RSSFeed.styled';
import { useState } from 'react';

const ArticleSummary = (props: ArticleSummaryProps) => {
    const [showMessage, setShowMessage] = useState(false);

    return (
        <>
            <StyledArticleSummaryWrapper>
                <Bookmark
                    isChecked={props.isFavourite}
                    onClick={(isChecked) => {
                        setShowMessage(true);
                        props.toggleAddToFavourite(props.article, isChecked);
                        setTimeout(() => {
                            setShowMessage(false);
                        }, 2000);
                    }}
                />
                <ArticleHeader>{props.article.title}</ArticleHeader>
                <ArticleBibliography>Published: {format(new Date(props.article.pubDate), 'yyyy-MM-dd')} | Author: {props.article.creator}</ArticleBibliography>
                <ArticleContent>{props.article.contentSnippet}</ArticleContent>
                <ReadMoreButtonWrapper
                    onClick={() => {
                        props.onShowDetails(props.article);
                    }}
                >
                    <ReadMoreButton>Read more</ReadMoreButton>
                </ReadMoreButtonWrapper>
            </StyledArticleSummaryWrapper>
            <Message showmessage={showMessage ? 'true' : 'false'}>{props.isFavourite ? 'Article has been added to favourites' : 'Article has been removed from favourites'}</Message>
        </>

    );
};

export default ArticleSummary;
