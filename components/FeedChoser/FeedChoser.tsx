'use client'

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 550px;
  position: relative;
  font-family: sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

const Chip = styled.div<{ backgroundcolor: string }>`
  background: ${({ backgroundcolor }) => backgroundcolor};
  color: black;
  padding: 8px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
`;

const RemoveButton = styled.span`
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
`;

const Dropdown = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 150px;
  background: white;
  border: 1px solid #ccc;
  border-top: none;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 2px 0 0;
  z-index: 10;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
`;

const DropdownItem = styled.li`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background: #f9f9f9;
  }
`;

const DropdownText = styled.span`
  flex: 1;
`;

const DropdownRemove = styled.span`
  margin-left: 10px;
  color: #999;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    color: red;
  }
`;

const DropdownLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 10px;
  color: ${({ theme }) => theme.colors.labelColor};
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  width: 100%;
  diplay: block;
  margin-inline: auto;
  margin-bottom: 8px;
  color: ${({ theme }) => theme.colors.labelColor};
`;

const ErrorLabel = styled.label`
  font-size: 0.8rem;
  font-weight: 500;
  margin-bottom: 6px;
  margin-inline: auto;
  display: block;
  width: 100%;
  color: ${({ theme }) => theme.colors.errorLabelColor};
`;

export const StyledFeedChoserWrapper = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
`

const extractChips = (url: string) => {
    try {
        const urlToAdd = new URL(url);
        const hostName = urlToAdd.hostname;
        const pathName = urlToAdd.pathname;
        return `${hostName}${pathName}`;
    } catch (e) {
        return null;
    }
};

const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 85%)`;
};

function getInitialValueFromLocalStore<T>(localStoreKey: string): T {
    if (typeof window !== 'undefined') {
        const localStorageValue = localStorage.getItem(localStoreKey);
        if (localStorageValue) {
            return JSON.parse(localStorageValue) as T;
        }
        return [] as T;
    }
    return [] as T;
}

function setValueToLocalStore<T>(localStoreKey: string, value: T) {
    if (typeof window !== 'undefined') {
        localStorage.setItem(localStoreKey, JSON.stringify(value));
    }
}

export type Chip = {
    label: string;
    color: string;
}

export type FeedElement = {
    url: string;
}

export const STORED_CHIPS_KEY = 'storedChips';
export const STORED_FEEDS_KEY = 'storedFeeds';

const FeedChoser = () => {
    const [inputValue, setInputValue] = useState('');
    const [chips, setChips] = useState<Chip[]>(getInitialValueFromLocalStore<Chip[]>(STORED_CHIPS_KEY));
    const [error, setError] = useState<string | null>(null);
    const [feedElements, setFeedElements] = useState<FeedElement[]>(getInitialValueFromLocalStore<FeedElement[]>(STORED_FEEDS_KEY));
    const [showDropdown, setShowDropdown] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const inputRef = useRef(null);

    const handleAddUrl = (url: string) => {
        const domain = extractChips(url);
        setError(null);
        if (domain && !chips.find((chip) => chip.label === url)) {
            localStorage.setItem('storedChips', JSON.stringify(chips));
            setChips((prev) => {
                const newChips = [...prev, { label: url, color: getRandomColor() }]
                setValueToLocalStore<Chip[]>(STORED_CHIPS_KEY, newChips);
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
            return newChips;
        });
    };

    const handleDeleteFromDropdown = (urlToRemove: string) => {
        setChips((prev) => {
            const newChips = prev.filter((chip) => chip.label !== urlToRemove);
            setValueToLocalStore(STORED_CHIPS_KEY, newChips);
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
                return newChips;
            });
        }
    };

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <StyledFeedChoserWrapper>
            <Container>
                <Label htmlFor="feed-input">Your RSS Feeds:</Label>
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
