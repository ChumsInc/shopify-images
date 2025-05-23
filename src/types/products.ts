import { Product } from 'chums-types/src/shopify';

export interface ProductWithMedia extends Product {
    mediaTypes: string[];
    mediaCount: number;
}
