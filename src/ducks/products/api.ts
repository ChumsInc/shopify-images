import {fetchJSON} from "chums-ui-utils";
import {Product} from "chums-types/src/shopify";

export interface FetchProductOptions {
    status?: 'ACTIVE'|'DRAFT'|'ARCHIVED';
}
export async function fetchProducts(arg?:FetchProductOptions) {
    try {
        const params = new URLSearchParams();
        if (arg?.status) {
            params.set('status', arg.status);
        }
        const url = `/api/shopify/admin/products.json?${params.toString()}`;
        const res = await fetchJSON<Product[]>(url, {cache: 'no-cache'});
        return res ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchProducts()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchProducts()", err);
        return Promise.reject(new Error('Error in fetchProducts()'));
    }
}
