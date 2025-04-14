export type ChipObj = {
    label: string;
    color: string;
}

export type FeedElement = {
    url: string;
}

export type FeedChoserProps = {
    subscriptions: ChipObj[],
    onSubscriptionChange: (subscriptions: ChipObj[]) => void;
}