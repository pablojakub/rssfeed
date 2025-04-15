'use client'
import React, { useState, useRef } from 'react';
import { Chip, ChipsContainer, Container, Dropdown, DropdownItem, DropdownLabel, DropdownRemove, DropdownText, ErrorLabel, Input, Label, RemoveButton, StyledFeedChoserWrapper } from './FeedChoser.styled';
import { ChipObj, FeedChoserProps, FeedElement } from './FeedChoser.types';
import { extractChips, getRandomColor } from './FeedChoser.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';

export const STORED_CHIPS_KEY = 'storedChips';
export const STORED_FEEDS_KEY = 'storedFeeds';

const RSSFeedUrls = [
    'https://www.nasa.gov/technology/feed/',
    'https://techcrunch.com/feed/',
]

const FeedChoser = (props: FeedChoserProps) => {
    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [feedElements, setFeedElements] = useState<FeedElement[]>(getInitialValueFromLocalStore<FeedElement[]>(STORED_FEEDS_KEY));
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    const handleAddUrl = (url: string) => {
        const domain = extractChips(url);
        alert(domain);
        setError(null);
        if (domain && !props.subscriptions.find((chip) => chip.label === url)) {
            alert('wijam do dodania');
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }]
            setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
            setFeedElements((prev) => {
                const newFeeds = [...prev, { url }]
                setValueToLocalStore<FeedElement[]>(STORED_FEEDS_KEY, newFeeds);
                return newFeeds;
            });
            setInputValue('');
            return;
        }
        if (props.subscriptions.find((chip) => chip.label === url)) {
            setError('Feed already exist');
            setInputValue('');
            return;
        }
        setError('Invalid input value. Type url with https://');
        setInputValue('');

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            alert('enter');
            handleAddUrl(inputValue);
        }
    };

    const handleDelete = (urlToRemove: string) => {
        const newChips = props.subscriptions.filter((chip) => chip.label !== urlToRemove);
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
    };

    const handleDeleteFromDropdown = (urlToRemove: string) => {
        const newChips = props.subscriptions.filter((chip) => chip.label !== urlToRemove);
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
        setFeedElements((prev) => {
            const newFeeds = prev.filter((feed) => feed.url !== urlToRemove);
            setValueToLocalStore(STORED_FEEDS_KEY, newFeeds);
            return newFeeds;
        });
    };

    const handleDropdownClick = (url: string) => {
        if (!props.subscriptions.find((chip) => chip.label === url)) {
            const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }];
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChange(newChips);
        }
    };

    const handlePromptClick = (url: string) => {
        const newChips = [...props.subscriptions, { label: url, color: getRandomColor() }];
        setValueToLocalStore(STORED_CHIPS_KEY, newChips);
        props.onSubscriptionChange(newChips);
        setFeedElements([{ url }]);
    }

    return (
        <StyledFeedChoserWrapper>
            <Container>
                <Label htmlFor="feed-input">RSS Feeds:</Label>
                {error && (<ErrorLabel htmlFor="feed-input">{error}</ErrorLabel>)}
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
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    placeholder="Paste a URL and press Enter to add new RSS Feed"
                    error={error}
                />
                {showDropdown && feedElements.length > 0 && (
                    <Dropdown>
                        <DropdownLabel>Choose to which subscribe:</DropdownLabel>
                        {feedElements.map((feedElement, idx) => (
                            <DropdownItem
                                key={idx}
                                isdisabled={props.subscriptions.some((chip) => chip.label === feedElement.url) ? 'true' : 'false'}
                            >
                                <DropdownText onClick={() => handleDropdownClick(feedElement.url)}>
                                    {feedElement.url}
                                </DropdownText>
                                <DropdownRemove onClick={() => handleDeleteFromDropdown(feedElement.url)}>
                                    ×
                                </DropdownRemove>
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
                {showDropdown && feedElements.length === 0 && (
                    <Dropdown>
                        <DropdownLabel>No idea? Try one of below items:</DropdownLabel>
                        {RSSFeedUrls.map((feedElement, idx) => (
                            <DropdownItem
                                key={idx}
                                isdisabled={'false'}
                            >
                                <DropdownText onClick={() => handlePromptClick(feedElement)}>
                                    {feedElement}
                                </DropdownText>
                            </DropdownItem>
                        ))}
                    </Dropdown>
                )}
            </Container>
            <Container>
                <Label key='subscription_label'>Your subscriptions:</Label>
                <ChipsContainer>
                    {props.subscriptions.map((chip, idx) => (
                        <Chip
                            key={idx}
                            backgroundcolor={chip.color}
                        >
                            {extractChips(chip.label)}
                            <RemoveButton onClick={() => handleDelete(chip.label)}>×</RemoveButton>
                        </Chip>
                    ))}
                </ChipsContainer>
            </Container>

        </StyledFeedChoserWrapper>
    );
};

export default FeedChoser;
