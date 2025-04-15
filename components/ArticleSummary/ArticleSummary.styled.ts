import styled from "styled-components";
import { BREAKPOINTS } from "../RSSFeed/RSSFeed.styled";

export const StyledArticleSummaryWrapper = styled.div`
    border-radius: 5px;
    padding: 8px 16px;
    margin-left: auto;
    margin-right: auto;
    width: calc(100% - 2* ${({ theme }) => theme.layout.paddingInline});
    overflow: hidden;
    box-shadow: ${({ theme }) => theme.layout.shadow};
    transition: all 0.3s ease-in-out;
    transform: perspective(1000px) translateZ(0);
    background: white;

    &:hover {
        transform: perspective(1000px) translateZ(2px);
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
       width: 100%;
    }
`;

export const ArticleHeader = styled.h2`
    margin: 0;
    font-size: clamp(1rem, 0.912rem + 0.256vw, 1.2rem);
    font-weight: 600;
    color: black;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const ArticleBibliography = styled.p`
    font-size: .8rem;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: ${({ theme }) => theme.colors.secondary};
`;

export const ArticleContent = styled.p`
    font-size: .8rem;
    font-weight: 500;
    color: black;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    `;

export const ReadMoreButtonWrapper = styled.div`
    text-align: right;
`

export const ReadMoreButton = styled.button`
    cursor: pointer;
    font-size: .8rem;
    outline: none;
    border: none;
    color: ${({ theme }) => theme.colors.primary};
`