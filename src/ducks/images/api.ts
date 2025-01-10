import {MediaChange, ProductMedia} from "_src/types/media";
import {fetchJSON} from "chums-components";

export async function getProductMedia(): Promise<ProductMedia[]> {
    try {
        const url = '/api/shopify/admin/products/media.json';
        const res = await fetchJSON<{ media: ProductMedia[] }>(url, {cache: 'no-cache'});
        return res?.media ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("getProductMedia()", err.message);
            return Promise.reject(err);
        }
        console.debug("getProductMedia()", err);
        return Promise.reject(new Error('Error in getProductMedia()'));
    }
}

export async function putProductMedia(arg: MediaChange): Promise<ProductMedia | null> {
    try {
        const url = '/api/shopify/admin/products/media.json';
        const body = JSON.stringify(arg);
        const res = await fetchJSON<{ media: ProductMedia | null }>(url, {method: 'PUT', body});
        return res?.media ?? null;
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("putProductMedia()", err.message);
            return Promise.reject(err);
        }
        console.debug("putProductMedia()", err);
        return Promise.reject(new Error('Error in putProductMedia()'));
    }
}

export async function mutateProductMedia(changes: MediaChange[]): Promise<ProductMedia[]> {
    try {
        const url = '/api/shopify/graphql/mutate/products/media.json';
        const body = JSON.stringify({changes});
        const res = await fetchJSON<{ media: ProductMedia[] }>(url, {cache: 'no-cache', method: 'PUT', body});
        return res?.media ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("mutateProductMedia()", err.message);
            return Promise.reject(err);
        }
        console.debug("mutateProductMedia()", err);
        return Promise.reject(new Error('Error in mutateProductMedia()'));
    }
}
