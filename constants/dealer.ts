export const DEALER_TYPES = [
    'Spare Parts Dealer',
    'Customer Dealer',
] as const;

export type DealerType = typeof DEALER_TYPES[number];