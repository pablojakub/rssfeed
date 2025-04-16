'use client'
import { useState } from 'react';
import { StyledIconWrapper } from './Bookmark.styled';
import { BookmarkProps } from './Bookmark.types';
import { FilledStar } from '@/components/Icons/FilledStar';
import { OutlineStar } from '@/components/Icons/OutlineStar';

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
            data-tooltip-id='info'
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
