import type {Media} from "chums-types/shopify";

export interface ProductMedia extends Media {
    product_id: string;
}

export type MediaChange = Pick<Media, 'id'|'alt'>;

export interface FilesUserError {
    code: string;
    field: string[];
    message: string;
}
