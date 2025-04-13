export type ChipObj = {
    label: string;
    color: string;
}

export type FeedElement = {
    url: string;
}

export type FeedChoserProps = {
    initialSubscriptions: ChipObj[],
    onSubscriptionChange: (subscriptions: ChipObj[]) => void;
}