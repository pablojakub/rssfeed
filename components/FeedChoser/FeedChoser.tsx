'use client'
import React, { useState, useRef } from 'react';
import { Chip, ChipsContainer, Container, Dropdown, DropdownItem, DropdownLabel, DropdownRemove, DropdownText, ErrorLabel, Input, Label, RemoveButton, StyledFeedChoserWrapper } from './FeedChoser.styled';
import { ChipObj, FeedChoserProps, FeedElement } from './FeedChoser.types';
import { extractChips, getRandomColor } from './FeedChoser.utils';
import { getInitialValueFromLocalStore, setValueToLocalStore } from '../utils';

export const STORED_CHIPS_KEY = 'storedChips';
export const STORED_FEEDS_KEY = 'storedFeeds';

const FeedChoser = (props: FeedChoserProps) => {
    const [inputValue, setInputValue] = useState('');
    const [chips, setChips] = useState<ChipObj[]>(props.initialSubscriptions);
    const [error, setError] = useState<string | null>(null);
    const [feedElements, setFeedElements] = useState<FeedElement[]>(getInitialValueFromLocalStore<FeedElement[]>(STORED_FEEDS_KEY));
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    const handleAddUrl = (url: string) => {
        const domain = extractChips(url);
        setError(null);
        if (domain && !chips.find((chip) => chip.label === url)) {
            localStorage.setItem('storedChips', JSON.stringify(chips));
            setChips((prev) => {
                const newChips = [...prev, { label: url, color: getRandomColor() }]
                setValueToLocalStore<ChipObj[]>(STORED_CHIPS_KEY, newChips);
                props.onSubscriptionChage(newChips);
                return newChips
            });
            setFeedElements((prev) => {
                const newFeeds = [...prev, { url }]
                setValueToLocalStore<FeedElement[]>(STORED_FEEDS_KEY, newFeeds);
                return newFeeds;
            });
            setInputValue('');
            return;
        }
        if (chips.find((chip) => chip.label === url)) {
            setError('Feed already exist');
            setInputValue('');
            return;
        }
        setError('Unproper input value');
        setInputValue('');

    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddUrl(inputValue);
        }
    };

    const handleDelete = (urlToRemove: string) => {
        setChips((prev) => {
            const newChips = prev.filter((chip) => chip.label !== urlToRemove);
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChage(newChips);
            return newChips;
        });
    };

    const handleDeleteFromDropdown = (urlToRemove: string) => {
        setChips((prev) => {
            const newChips = prev.filter((chip) => chip.label !== urlToRemove);
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
            props.onSubscriptionChage(newChips);
            return newChips;
        });
        setFeedElements((prev) => {
            const newFeeds = prev.filter((feed) => feed.url !== urlToRemove);
            setValueToLocalStore(STORED_FEEDS_KEY, newFeeds);
            return newFeeds;

        });
    };

    const handleDropdownClick = (url: string) => {
        if (!chips.find((chip) => chip.label === url)) {
            setChips((prev) => {
                const newChips = [...prev, { label: url, color: getRandomColor() }];
                setValueToLocalStore(STORED_CHIPS_KEY, newChips);
                props.onSubscriptionChage(newChips);
                return newChips;
            });
        }
    };

    return (
        <StyledFeedChoserWrapper>
            <Container>
                <Label htmlFor="feed-input">RSS Feeds:</Label>
                {error && (<ErrorLabel htmlFor="feed-input">{error}</ErrorLabel>)}
                <Input
                    id='feed-input'
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    placeholder="Paste a URL and press Enter to add new RSS Feed"
                />
                {showDropdown && feedElements.length > 0 && (
                    <Dropdown>
                        <DropdownLabel>Choose to which subscribe:</DropdownLabel>
                        {feedElements.map((feedElement, idx) => (
                            <DropdownItem key={idx}>
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
            </Container>
            <Container>
                <Label>Your subscriptions:</Label>
                <ChipsContainer>
                    {chips.map((chip, idx) => (
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
