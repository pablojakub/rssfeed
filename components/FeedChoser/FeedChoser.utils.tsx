import { SELECT_ALL_KEY } from "./FeedChoser";
import { Chip, TooltipElements } from "./FeedChoser.styled";
import { ChipObj } from "./FeedChoser.types";
import ReactDOMServer from 'react-dom/server';

export const extractChips = (url: string) => {
    try {
        const urlToAdd = new URL(url);
        const hostName = urlToAdd.hostname;
        const pathName = urlToAdd.pathname;
        return `${hostName}${pathName}`;
    } catch (e) {
        return null;
    }
};

export const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 10) + 210;
    const saturation = Math.floor(Math.random() * 10) + 45;
    const lightness = Math.floor(Math.random() * 20) + 75;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

export const getDynamicChipsElements = (chipObj: ChipObj[], maxVisibleElements: number) => {
    const filteredChips = chipObj.filter((chip) => chip.label !== SELECT_ALL_KEY)
    if (filteredChips.length < maxVisibleElements) {
        return (
            filteredChips
                .map((chip, idx) => (
                    <Chip
                        key={idx}
                        backgroundcolor={chip.color}
                    >
                        {extractChips(chip.label)}
                    </Chip>
                ))
        )
    }
    const visibleChips = chipObj.slice(0, maxVisibleElements);
    const invisibleChips = chipObj.slice(maxVisibleElements, chipObj.length);
    return (
        <>
            {visibleChips.filter((chip) => chip.label !== SELECT_ALL_KEY)
                .map((chip, idx) => (
                    <Chip
                        key={idx}
                        backgroundcolor={chip.color}
                    >
                        {extractChips(chip.label)}
                    </Chip>
                ))}
            <Chip
                key='chip_shortcut'
                backgroundcolor={invisibleChips[0].color}
                data-tooltip-id='chips-info'
                data-tooltip-place='top-start'
                data-tooltip-variant='light'
                data-tooltip-delay-show={400}
                data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<TooltipElements>
                    {invisibleChips.map((chip, index) => (
                        <div key={index}>
                            {chip.label}
                        </div>
                    ))}
                </TooltipElements>)
                }
            >
                +{invisibleChips.length}
            </Chip>
        </>

    )
}

export const isCheckboxSelected = (feedElementUrl: string, subscriptions: ChipObj[], isSelectAllChecked: boolean) => {
    if (subscriptions.some((chip) => chip.label === feedElementUrl)) {
        return true;
    }
    if (feedElementUrl === SELECT_ALL_KEY && isSelectAllChecked) {
        return true;
    }
    return false;
}
