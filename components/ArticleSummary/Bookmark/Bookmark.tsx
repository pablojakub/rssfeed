'use client'
import { useState } from 'react';
import { StyledIconWrapper } from './Bookmark.styled';
import { BookmarkProps } from './Bookmark.types';

export const OutlineStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72" id="Star">
        <path d="M52.708 68.917a6.722 6.722 0 0 1-3.17-.795l-13.537-7.287-13.533 7.285c-2.194 1.17-4.944 1.012-6.964-.373-2.075-1.43-3.146-3.932-2.731-6.377l2.651-15.838-11.44-11.424c-1.758-1.75-2.353-4.288-1.551-6.623.798-2.314 2.817-3.978 5.271-4.342l15.562-2.313 6.759-14.033c1.089-2.256 3.435-3.713 5.976-3.713 2.543 0 4.888 1.458 5.974 3.713l6.761 14.033 15.56 2.314c2.452.363 4.473 2.025 5.272 4.338a6.375 6.375 0 0 1-1.549 6.627L56.575 45.532l2.654 15.84c.411 2.445-.66 4.947-2.729 6.373a6.699 6.699 0 0 1-3.792 1.172zM36.001 56.563c.326 0 .652.08.948.238l14.48 7.795a2.76 2.76 0 0 0 2.808-.15c.801-.551 1.204-1.477 1.047-2.412L52.46 45.176a2.002 2.002 0 0 1 .56-1.746l12.174-12.153a2.401 2.401 0 0 0 .591-2.495c-.308-.891-1.104-1.538-2.076-1.682L47.1 24.63a1.999 1.999 0 0 1-1.508-1.11L38.371 8.533c-.424-.881-1.354-1.449-2.37-1.449s-1.947.569-2.374 1.45L26.41 23.52a1.999 1.999 0 0 1-1.508 1.11L8.292 27.1c-.958.143-1.772.804-2.077 1.687-.3.873-.072 1.827.593 2.489L18.98 43.43c.458.457.666 1.107.56 1.746l-2.822 16.857c-.158.936.245 1.859 1.053 2.416.804.551 1.923.617 2.809.145l14.474-7.793c.295-.158.621-.238.947-.238z" fill="#FF6700"></path>
        <path d="M14.085 32.118a1.001 1.001 0 0 1-.159-1.987l.664-.108a.994.994 0 0 1 1.147.827 1 1 0 0 1-.827 1.147l-.664.108a.971.971 0 0 1-.161.013zm3.672-.596a1 1 0 0 1-.188-1.982l10.823-2.088 4.082-9.362a1 1 0 1 1 1.834.799l-4.293 9.845a1 1 0 0 1-.728.582l-11.34 2.188a.947.947 0 0 1-.19.018z" fill="#FF6700"></path>
    </svg>
);

export const FilledStar = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" id="Star">
        <g id="Layer_2" fill="#FF6700">
            <path id="Icons" d="M127.607 49.526a8.001 8.001 0 0 0-6.359-5.428l-33.826-5.341L71.23 4.575a8.001 8.001 0 0 0-14.461 0L40.578 38.757l-33.826 5.34a8 8 0 0 0-4.408 13.56L27.316 82.63l-7.162 35.802a8.001 8.001 0 0 0 11.73 8.562L64 109.152l32.115 17.842a8 8 0 0 0 11.73-8.562l-7.161-35.802 24.972-24.974a7.995 7.995 0 0 0 1.951-8.13z" fill="#FF6700"></path>
        </g>
    </svg>
)

const Bookmark = (props: BookmarkProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const isTouchDevice = typeof window !== "undefined" && (
        'ontouchstart' in window || navigator.maxTouchPoints > 0
    );

    return (
        <StyledIconWrapper
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={() => {
                props.onClick(!props.isChecked);
            }}
            data-tooltip-id='bookmark-info'
            data-tooltip-place='bottom-start'
            data-tooltip-variant='light'
            data-tooltip-delay-show={400}
            data-tooltip-content={props.isChecked
                ? 'Remove from favourites'
                : 'Add to favourites'}
        >
            {props.isChecked || (isHovered && !isTouchDevice) ? <FilledStar /> : <OutlineStar />}
        </StyledIconWrapper>
    );
};

export default Bookmark;
