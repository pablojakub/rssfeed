import styled from "styled-components";
import { BREAKPOINTS } from "../RSSFeed.styled";

export const StyledFilterPanelWrapper = styled.div`
    grid-column: breakout;
    display: flex;
    padding-inline: ${({ theme }) => theme.layout.paddingInline};
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;

    @media (max-width: ${BREAKPOINTS.MOBILE}) {
       flex-direction: column-reverse;
       align-items: flex-start;
    }
`;

export const LabelWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

export const StarWrapper = styled.div`
    cursor: pointer;
    width: 20px;
    height: 20px;
`;

export const InputGroup = styled.div`

`