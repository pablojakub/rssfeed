import styled, { keyframes } from "styled-components";

export const BREAKPOINTS = {
    LAPTOP: '1600px',
    TABLET: '1100px',
    MOBILE: '550px',
}

export const StyledRssWrapper = styled.div`
    display: grid;
    grid-template-columns: [full-start] 500px [breakout-start] 200px [content-start] 1fr [content-end] 200px [breakout-end] 500px [full-end];
    line-height: 1.6;
    row-gap: 1rem;

    @media (max-width: ${BREAKPOINTS.LAPTOP}) {
        grid-template-columns: [full-start] 300px [breakout-start] 100px [content-start] 1fr [content-end] 100px [breakout-end] 300px [full-end];
    }

    @media (max-width: ${BREAKPOINTS.TABLET}) {
        grid-template-columns: [full-start] 50px [breakout-start] 10px [content-start] 1fr [content-end] 10px [breakout-end] 50px [full-end];
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        grid-template-columns: [full-start] 10px [breakout-start] 10px [content-start] 1fr [content-end] 10px [breakout-end] 10px [full-end];
    }
`;

export const StyledTitleHeaderWrapper = styled.div`
    grid-column: full;
    display: grid;
    place-content: center;
    padding: 16px;

    background-color: ${({ theme }) => theme.colors.primary};
    box-shadow: ${({ theme }) => theme.layout.shadow};
`

export const StyledHeader = styled.h1`
    margin: 0;
    font-size: clamp(1.5rem, 1.273rem + 0.727vw, 2rem);
    font-weight: 700;
    color: white;
`;

export const ArticleSummaryWrapper = styled.div`
    grid-column: breakout;
    height: 63vh;
    display: grid;
    grid-auto-rows: 130px;
    gap: 8px;
    overflow-y: auto;
    scrollbar-gutter: stable;
    overscroll-behavior-block: contain;
    scroll-snap-type: block mandatory;
    position: relative;

    &::after {
        content: '';
        position: sticky;
        background: linear-gradient(0deg, hsl(0, 0%, 96%) 30%, transparent 70%);
        width: 100%;
        height: 35px;
        bottom: 0;
        z-index: 3;
    }

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

     @media (max-width: ${BREAKPOINTS.LAPTOP}) {
        height: 53vh;
    }

     @media (max-width: ${BREAKPOINTS.TABLET}) {
        height: 67vh;
    }
    
    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        height: auto;
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
    width: calc(100% - ${({ theme }) => theme.layout.paddingInline});
    border-radius: 5px;
    background-color: ${({ theme }) => theme.colors.scrollBarColor};
    animation: ${pulseAnimation} ease-out 1.7s infinite;

      @media (max-width: ${BREAKPOINTS.MOBILE}) {
       width: 100%;
    }
`;

export const Message = styled.div<{ showmessage: string }>`
    position: fixed;
    bottom: 40px;
    margin-left: auto;
    margin-right: auto;
    left: 0px;
    width: 400px;
    text-align: center;
    right: 0px;
    color: white;
    font-weight: 600;
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    padding: 16px 8px;
    opacity: ${({ showmessage }) => showmessage === 'true' ? '1' : '0'};
    transition: opacity 200ms ease-in-out;
    z-index: 2;

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
       width: 300px;
       font-size: 0.8rem;
    }
`;

export const NoDataWrapper = styled.div`
    display: grid;
    place-content: center;
`;