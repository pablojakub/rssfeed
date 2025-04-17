'use client'
import React, { useState, useRef } from 'react';
import { ChipsContainer, Container, Dropdown, DropdownCheckbox, DropdownItem, DropdownLabel, DropdownRemove, DropdownText, EntryDescription, ErrorLabel, Input, Label, LabelWrapper, RemoveButton, StyledFeedChoserWrapper, StyledInfoWrapper } from './FeedChoser.styled';
import { ChipObj, FeedChoserProps, FeedElement } from './FeedChoser.types';
import ReactDOMServer from 'react-dom/server';
import { extractChips, getDynamicChipsElements, getRandomColor, isCheckboxSelected } from './FeedChoser.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';
import { Info } from '../Icons/Info';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { Tooltip } from 'react-tooltip';

export const STORED_CHIPS_KEY = 'storedChips';
export const STORED_FEEDS_KEY = 'storedFeeds';
export const SELECT_ALL_KEY = 'Select all'
export const SELECT_ALL_FEED_ELEMENT = [{ url: SELECT_ALL_KEY }];

const FeedChoser = (props: FeedChoserProps) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const feedsFromLocalStorage = getInitialValueFromLocalStore<FeedElement[]>(STORED_FEEDS_KEY);
    const [feedElements, setFeedElements] = useState<FeedElement[]>([...SELECT_ALL_FEED_ELEMENT, ...feedsFromLocalStorage]);
    const [showDropdown, setShowDropdown] = useState(false);
    const areAllSelected = (feedElements.length - 1) === props.subscriptions.length;
    const [isSelectAll, setIsSelectAll] = useState(areAllSelected);
    const inputRef = useRef(null);
    const maxVisibleChipElements = 5;

    const handleAddUrl = (url: string) => {
        const domain = extractChips(url);
        setError(null);
        if (domain && !feedElements.find((feedEl) => feedEl.url === url)) {
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }]
            setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
            setFeedElements((prev) => {
                const newFeeds = [...prev, { url }];
                const feedsToSaveInLocalStore = newFeeds.filter((feed) => feed.url !== SELECT_ALL_KEY);
                setValueToLocalStore<FeedElement[]>(STORED_FEEDS_KEY, feedsToSaveInLocalStore);
                return newFeeds;
            });
            setIsSelectAll(areAllSelected);
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

    const handleDeleteFromDropdown = (urlToRemove: string) => {
        const newChips = props.subscriptions.filter((chip) => chip.label !== urlToRemove);
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
        setFeedElements((prev) => {
            const newFeeds = prev.filter((feed) => feed.url !== urlToRemove);
            const feedsToSaveInLocalStore = newFeeds.filter((feed) => feed.url !== SELECT_ALL_KEY);
            setValueToLocalStore(STORED_FEEDS_KEY, feedsToSaveInLocalStore);
            if (feedsToSaveInLocalStore.length === 0) {
                setIsSelectAll(false);
            }
            return newFeeds;
        });
    };

    const handleDelete = (urlToRemove: string) => {
        const newChips = props.subscriptions.filter((chip) => chip.label !== urlToRemove);
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
        setIsSelectAll(false);
    };

    const handleAddAll = () => {
        const newChips = feedElements
            .filter((el) => el.url !== SELECT_ALL_KEY)
            .map((el) => {
                return {
                    color: getRandomColor(),
                    label: el.url,
                }
            })
        setIsSelectAll(true);
        setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
    }

    const handleRemoveAll = () => {
        setIsSelectAll(false);
        setValueToLocalStore(STORED_CHIPS_KEY, []);
        props.onSubscriptionChange([]);
    }

    const handleToggleAddElement = (url: string) => {
        if (url === SELECT_ALL_KEY && !areAllSelected) {
            handleAddAll();
            return;
        }
        if (url === SELECT_ALL_KEY && areAllSelected) {
            handleRemoveAll();
            return;
        }
        if (!props.subscriptions.find((chip) => chip.label === url)) {
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }];
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
            setIsSelectAll(newChips.length === (feedElements.length - 1));
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
                        data-tooltip-html={ReactDOMServer.renderToStaticMarkup(<EntryDescription>
                            Here you can add and subscribe to RSS feeds. Enter url with https:// prefix. For example:
                            https://www.nasa.gov/technology/feed/
                        </EntryDescription>)}
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
                    {showDropdown && feedsFromLocalStorage.length > 0 && (
                        <Dropdown>
                            <DropdownLabel>Choose to which subscribe:</DropdownLabel>
                            {feedElements.map((feedElement, idx) => (
                                <DropdownItem
                                    key={idx}
                                >
                                    <DropdownCheckbox
                                        type='checkbox'
                                        checked={isCheckboxSelected(feedElement.url, props.subscriptions, isSelectAll)}
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
                                    {feedElement.url !== SELECT_ALL_KEY && (
                                        <DropdownRemove onClick={() => handleDeleteFromDropdown(feedElement.url)}>
                                            ×
                                        </DropdownRemove>)}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    )}
                </div>
            </Container>
            <Container>
                <Label key='subscription_label'>Your subscriptions:</Label>
                <ChipsContainer>
                    {getDynamicChipsElements(props.subscriptions, maxVisibleChipElements)}
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
                    zIndex: 4,
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
