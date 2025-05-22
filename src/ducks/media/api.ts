import {FilesUserError, MediaChange, ProductMedia} from "@/src/types/media";
import {fetchJSON} from "@chumsinc/ui-utils";

export async function getProductMedia(arg?:string): Promise<ProductMedia[]> {
    try {
        const params = new URLSearchParams();
        if (arg) {
            params.set('handle', arg);
        }
        const url = `/api/shopify/graphql/query/products/media.json?${params.toString()}`;
        const res = await fetchJSON<ProductMedia[]>(url, {cache: 'no-cache'});
        return res ?? [];
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

export interface UnlinkProductMediaArg {
    mediaId: string;
    productId: string;
}
export async function postUnlinkProductMedia(arg: UnlinkProductMediaArg): Promise<ProductMedia[]> {
    try {
        const url = `/api/shopify/graphql/mutate/products/unlink/media.json`;
        const body = JSON.stringify(arg);
        const res = await fetchJSON<{media:ProductMedia[], errors: FilesUserError[]}>(url, {method: 'POST', body});
        if (res?.errors?.length) {
            return Promise.reject(new Error(res.errors[0].message));
        }
        return res?.media ?? [];
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("postUnlinkProductMedia()", err.message);
            return Promise.reject(err);
        }
        console.debug("postUnlinkProductMedia()", err);
        return Promise.reject(new Error('Error in postUnlinkProductMedia()'));
    }
}
