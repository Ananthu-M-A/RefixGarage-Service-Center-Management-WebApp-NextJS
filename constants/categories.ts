export const STOCK_CATEGORIES = [
    "Spare Parts",
    "Accessories",
    "Consumables",
    "Tools & Equipments",
    "Dongles",
] as const;

export type StockCategory = typeof STOCK_CATEGORIES[number];

