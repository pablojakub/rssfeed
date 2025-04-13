'use client'
import styled from 'styled-components';
import { FeedDTO } from '../RSSFeed/RSSFeed.types';
import Bookmark from './Bookmark/Bookmark';
import { format } from 'date-fns';

export const StyledArticleSummaryWrapper = styled.div`
    border-radius: 5px;
    padding: 8px 16px;
    margin-left: auto;
    margin-right: auto;
    width: 98%;
    margin-top: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    transform: perspective(1000px) translateZ(0);
    cursor: pointer;
    background: white;

    &:hover {
        transform: perspective(1000px) translateZ(2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }
`;

export const ArticleHeader = styled.h2`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
`;

export const ArticleBibliography = styled.p`
    font-size: .8rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.secondary};
`;

export type ArticleSummaryProps = {
    article: FeedDTO;
};

const ArticleSummary = (props: ArticleSummaryProps) => {
    return (
        <StyledArticleSummaryWrapper>
            <Bookmark isChecked={false} />
            <ArticleHeader>{props.article.title}</ArticleHeader>
            <ArticleBibliography>Published: {format(new Date(props.article.pubDate), 'yyyy-MM-dd')} | Author: {props.article.creator}</ArticleBibliography>
        </StyledArticleSummaryWrapper>
    );
};

export default ArticleSummary;
