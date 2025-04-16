import { Input, Label } from '@/components/FeedChoser/FeedChoser.styled';
import { InputGroup, LabelWrapper, StarWrapper, StyledFilterPanelWrapper } from './FilterPanel.styled';
import { FilterPanelProps } from './FilterPanel.types';
import { useCallback } from 'react';
import debounce from 'lodash/debounce';
import { FilledStar } from '@/components/Icons/FilledStar';
import { OutlineStar } from '@/components/Icons/OutlineStar';

const FilterPanel = (props: FilterPanelProps) => {
    const onSearchChange = useCallback(
        debounce((event: React.ChangeEvent<HTMLInputElement>) => {
            props.onSearchChange(event.target.value);
        }, 300),
        []
    );

    return (
        <StyledFilterPanelWrapper>
            <InputGroup>
                <Label htmlFor="search-input">Search by title:</Label>
                <Input
                    id='search-input'
                    key='filter-input'
                    onChange={onSearchChange}
                    placeholder="Start typing..."
                />
            </InputGroup>
            <LabelWrapper>
                <Label>{props.showOnlyFavourites ? 'Show all articles' : 'Show favourite articles'}</Label>
                <StarWrapper onClick={() => props.onToggleShowFavourites(!props.showOnlyFavourites)} >
                    {props.showOnlyFavourites ? <FilledStar /> : <OutlineStar />}
                </StarWrapper>
            </LabelWrapper>
        </StyledFilterPanelWrapper>
    )
};

export default FilterPanel;
