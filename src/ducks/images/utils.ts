import {SortProps} from "chums-types";
import {ProductMedia} from "_src/types/media";
import {Image} from "chums-types/src/shopify";

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
            case 'id':
            default:
                return a.id.localeCompare(b.id) * sortMod;
        }
    }


    export const parseImageUrl = (url: string|null|undefined):string|null => {
        if (!url) {
            return null;
        }
        const [src] = url.split('?');
        return src;
    }

    export const parseImageURLParams = (url: string|null|undefined, options?:Record<string, string>):URLSearchParams => {
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
