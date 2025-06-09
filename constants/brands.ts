export const SMARTPHONE_BRANDS = [
    'Apple',
    'Samsung',
    'Pixel',
    'OnePlus',
    'Xiaomi',
    'Oppo',
    'Vivo',
    'Motorola',
    'Sony',
    'Realme',
    'IQOO',
    'Nothing',
    'Itel',
    'Tecno',
    'Infinix',
    'Nokia',
    'Huawei',
    'Honor',
    'Lenovo',
    'Others',
] as const;

export type SmartphoneBrand = typeof SMARTPHONE_BRANDS[number];