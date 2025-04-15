export type FilterPanelProps = {
    showOnlyFavourites: boolean;
    onToggleShowFavourites: (showFavourites: boolean) => void;
    onSearchChange: (searchValue: string) => void;
};