import {Media} from "chums-types/src/shopify";

export interface ProductMedia extends Omit<Media, 'mediaContentType'> {
    product_id: string;
}

export type MediaChange = Pick<Media, 'id'|'alt'>;
