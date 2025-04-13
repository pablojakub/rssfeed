import styled, { keyframes } from "styled-components";

export const StyledRssWrapper = styled.div`
    display: grid;
    grid-template-columns: [full-start] 500px [breakout-start] 200px [content-start] 1fr [content-end] 200px [breakout-end] 500px [full-end];
    line-height: 1.6;
    row-gap: 1rem;
`;

export const StyledTitleHeaderWrapper = styled.div`
    grid-column: full;
    display: grid;
    place-content: center;
    padding: 16px;

    background-color: ${({ theme }) => theme.colors.primary};
`

export const StyledHeader = styled.h1`
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    color: white;
`;

export const ArticleSummaryWrapper = styled.div`
    grid-column: breakout;
    margin-top: 8px;
    height: 650px;
    display: grid;
    grid-auto-rows: 20%;
    gap: 8px;
    overflow-y: auto;
    scrollbar-gutter: stable;
    overscroll-behavior-block: contain;
    scroll-snap-type: block mandatory;
    position: relative;

    & > * {
        scroll-snap-align: start;
    }

    &::-webkit-scrollbar {
        border-radius: 5px;
        width: 8px;
    }

    :hover::-webkit-scrollbar-thumb {
        width: 8px;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.colors.scrollBarColor};
    }
`;

export const pulseAnimation = keyframes`
    0% {
        opacity: 1;
    }
    70% {
        opacity: 0.3;
    }
    100% {
        opacity: 1;
    }
`;

export const SkeletonLoader = styled.div<{ width?: number, height?: string }>`
    width: 98%;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.scrollBarColor};;
    animation: ${pulseAnimation} ease-out 1.7s infinite;
`;