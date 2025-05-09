import styled from "styled-components";
import { BREAKPOINTS } from "../RSSFeed.styled";

export const StyledOverlay = styled.div`
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);
    z-index: 5;
`

export const StyledModalWrapper = styled.div`
    position: fixed;
    padding: 8px 16px;
    max-width: 800px;
     width: 100%;
    max-height: 80vh;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 5;
`;

export const StyledCloseBtn = styled.div`
    float: right;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.labelColor}
`;

export const Content = styled.div`
    text-align: center;
    max-height: 60vh;
    overflow: auto;

    figure, video {
        text-align: center;
        max-width: 760px;
        margin-block: 8px;
    }

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
        figure, video {
            text-align: center;
            max-width: 460px;
            margin-block: 8px;
        }
    }

    .social-icon {
        display: none;
    }

    div[class*="credits"] {
        display: none;
    } 

    div[class*="topic-cards"] {
        display: none;
    } 

    section[class*="related-articles"] {
        display: none;
    } 

    svg {
        display: none;
    }

`;

export const StyledModalHeader = styled.h3`
    color: black;
    font-size: 1rem;
    font-weight: 700;
    text-align: center;
    margin-top: 24px;
`

export const Link = styled.p`
    cursor: pointer;
    text-align: center;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 8px;
`;

export const StyledContentInfo = styled.h4`
    color: black;
    font-size: .8rem;
    font-weight: 700;
    text-align: center;
    margin-block: 24px;
`