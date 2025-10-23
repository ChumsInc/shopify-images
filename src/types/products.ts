import type { Product } from 'chums-types/shopify';

export interface ProductWithMedia extends Product {
    mediaTypes: string[];
    mediaCount: number;
}
