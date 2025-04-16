'use client'
import React, { useState, useRef } from 'react';
import { Chip, ChipsContainer, Container, Dropdown, DropdownCheckbox, DropdownItem, DropdownLabel, DropdownRemove, DropdownText, ErrorLabel, Input, Label, LabelWrapper, RemoveButton, StyledFeedChoserWrapper, StyledInfoWrapper } from './FeedChoser.styled';
import { ChipObj, FeedChoserProps, FeedElement } from './FeedChoser.types';
import { extractChips, getDynamicChipsElements, getRandomColor } from './FeedChoser.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';
import { Info } from '../Icons/Info';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Tooltip } from 'react-tooltip';

export const STORED_CHIPS_KEY = 'storedChips';
export const STORED_FEEDS_KEY = 'storedFeeds';
export const SELECT_ALL_KEY = 'Select all'

const RSSFeedUrls = [
    { url: SELECT_ALL_KEY },
    { url: 'https://www.nasa.gov/technology/feed/' },
    { url: 'https://techcrunch.com/feed/' },
    { url: 'https://www.nasa.gov/aeronautics/feed/' },
]

const FeedChoser = (props: FeedChoserProps) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const feedsFromLocalStorage = getInitialValueFromLocalStore<FeedElement[]>(STORED_FEEDS_KEY);
    const [feedElements, setFeedElements] = useState<FeedElement[]>([...RSSFeedUrls, ...feedsFromLocalStorage]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    const handleAddUrl = (url: string) => {
        const domain = extractChips(url);
        setError(null);
        if (domain && !feedElements.find((feedEl) => feedEl.url === url)) {
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }]
            setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
            setFeedElements((prev) => {
                const newFeeds = [...prev, { url }];
                const feedsToSaveInLocalStore = newFeeds.filter((feed) => RSSFeedUrls.includes(feed) === false);
                setValueToLocalStore<FeedElement[]>(STORED_FEEDS_KEY, feedsToSaveInLocalStore);
                return newFeeds;
            });

            setInputValue('');
            return;
        }
        if (feedElements.find((feedEl) => feedEl.url === url)) {
            setError('Feed already exist');
            setInputValue('');
            return;
        }
        setError('Invalid input value. Type url with https://');
        setInputValue('');

    };

    const refClickOutside = useDetectClickOutside({
        onTriggered: () => {
            setShowDropdown(false);
        },
    });

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddUrl(inputValue);
        }
    };

    const handleDelete = (urlToRemove: string) => {
        const newChips = props.subscriptions.filter((chip) => chip.label !== urlToRemove);
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
    };

    const handleAddAll = () => {
        const newChips = feedElements.map((el) => {
            return {
                color: getRandomColor(),
                label: el.url,
            }
        })
        setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
    }

    const handleRemoveAll = () => {
        setValueToLocalStore(STORED_CHIPS_KEY, []);
        props.onSubscriptionChange([]);
    }

    const handleToggleAddElement = (url: string) => {
        if (url === SELECT_ALL_KEY && !props.subscriptions.find((chip) => chip.label === SELECT_ALL_KEY)) {
            handleAddAll();
            return;
        }
        if (url === SELECT_ALL_KEY && props.subscriptions.find((chip) => chip.label === SELECT_ALL_KEY)) {
            handleRemoveAll();
            return;
        }
        if (!props.subscriptions.find((chip) => chip.label === url)) {
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }];
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
        } else {
            handleDelete(url);
        }
    };

    return (
        <StyledFeedChoserWrapper>
            <Container>
                <LabelWrapper>
                    <Label htmlFor="feed-input">RSS Feeds:
                    </Label>
                    <StyledInfoWrapper
                        data-tooltip-id='entry-info'
                        data-tooltip-place='top-start'
                        data-tooltip-variant='light'
                        data-tooltip-delay-show={400}
                        data-tooltip-content={'Add new feed url with https:// prefix or select from sugested list'}
                    ><Info />
                    </StyledInfoWrapper>
                </LabelWrapper>
                {error && (<ErrorLabel htmlFor="feed-input">{error}</ErrorLabel>)}
                <div ref={refClickOutside}>
                    <Input
                        id='feed-input'
                        key='feed-input'
                        type='text'
                        inputMode="text"
                        enterKeyHint="go"
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => {
                            setError(null);
                        }, 150)}
                        placeholder="Paste a URL and press Enter to add new RSS Feed"
                        error={error}
                    />
                    {showDropdown && (
                        <Dropdown>
                            <DropdownLabel>Choose to which subscribe:</DropdownLabel>
                            {feedElements.map((feedElement, idx) => (
                                <DropdownItem
                                    key={idx}
                                >
                                    <DropdownCheckbox
                                        type='checkbox'
                                        checked={props.subscriptions.some((chip) => chip.label === feedElement.url)}
                                        onChange={(e) => {
                                            e.stopPropagation();
                                            handleToggleAddElement(feedElement.url);
                                        }}
                                    />
                                    <DropdownText onClick={(e) => {
                                        e.stopPropagation();
                                        handleToggleAddElement(feedElement.url)
                                    }}>
                                        {feedElement.url}
                                    </DropdownText>
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </div>
            </Container>
            <Container>
                <Label key='subscription_label'>Your subscriptions:</Label>
                <ChipsContainer>
                    {getDynamicChipsElements(props.subscriptions, 5)}
                </ChipsContainer>
            </Container>
            <Tooltip
                id='entry-info'
                style={{
                    position: 'absolute',
                    color: 'black',
                    boxShadow: '0px 5px 7px 5px rgba(0,0,0,0.10)',
                    borderRadius: '5px',
                    padding: '0.5rem',
                    zIndex: 2,
                }}
            />
            <Tooltip
                id='chips-info'
                style={{
                    position: 'absolute',
                    color: 'black',
                    boxShadow: '0px 5px 7px 5px rgba(0,0,0,0.10)',
                    borderRadius: '5px',
                    padding: '0.5rem',
                    zIndex: 2,
                }}
            />
        </StyledFeedChoserWrapper >
    );
};

export default FeedChoser;
