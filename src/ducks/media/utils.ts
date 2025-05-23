import {SortProps} from "chums-types";
import {ProductMedia} from "@/src/types/media";
import {Image, ProductVariant} from "chums-types/src/shopify";
import {reImpulse2, reImpulse7} from "@/ducks/products/utils";

export const mediaSorter = ({field, ascending}: SortProps<ProductMedia> | SortProps<Image>) =>
    (a: ProductMedia, b: ProductMedia) => {
        const sortMod = ascending ? 1 : -1;
        switch (field) {
            case 'url':
            case 'altText':
                return (
                    (a.preview.image[field] ?? '').localeCompare(b.preview.image[field] ?? '') === 0
                        ? a.id.localeCompare(b.id)
                        : (a.preview.image[field] ?? '').localeCompare(b.preview.image[field] ?? '')
                ) * sortMod;
            case 'width':
            case 'height':
                return (
                    (a.preview.image[field] ?? 0) === (b.preview.image[field] ?? 0)
                        ? a.id.localeCompare(b.id)
                        : ((a.preview.image[field] ?? 0) > (b.preview.image[field] ?? 0) ? 1 : -1)
                ) * sortMod;
            case 'alt':
            case 'status':
            case 'product_id':
                return (
                    a[field].localeCompare(b[field]) === 0
                        ? a.id.localeCompare(b.id)
                        : a[field].localeCompare(b[field])
                ) * sortMod;
                case 'position':
                    return ((a.position ?? 0) - (b.position ?? 0)) * sortMod;
            case 'id':
            default:
                return a.id.localeCompare(b.id) * sortMod;
        }
    }


export const parseImageUrl = (url: string | null | undefined): string | null => {
    if (!url) {
        return null;
    }
    const [src] = url.split('?');
    return src;
}

export const parseImageURLParams = (url: string | null | undefined, options?: Record<string, string>): URLSearchParams => {
    if (!url) {
        return new URLSearchParams();
    }
    const [, query] = url.split('?');
    const params = new URLSearchParams(query);
    if (options) {
        Object.keys(options)
            .forEach(key => {
                params.set(key, options[key]);
            })
    }
    return params;
}

export function hasPrimaryImage(variants: ProductVariant[], id: string): boolean {
    return variants.some(variant => variant.media.some(m => m.id === id));
}

export function isValidImpulse7(alt: string): boolean {
    return reImpulse7.test(alt)
}

export function isImpulse2(alt: string): boolean {
    return reImpulse2.test(alt) && !reImpulse7.test(alt)
}

export function isValidAll(alt: string): boolean {
    return !reImpulse2.test(alt) && !reImpulse7.test(alt)
}

export function isMissingAltText(alt: string): boolean {
    return !alt || alt.trim().length === 0;
}

