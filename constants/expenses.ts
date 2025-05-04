export const EXPENSE_TYPES = [
    'Salary',
    'Bonus',
    'Electricity Bill',
    'Water Bill',
    'Internet Bill',
    'Office Rent',
    'House Rent',
    'Maintenance',
    'Transportation',
    'Entertainment',
    'Dining Out',
    'Healthcare',
    'Insurance',
    'Miscellaneous',
] as const;

export type ExpenseType = typeof EXPENSE_TYPES[number];
