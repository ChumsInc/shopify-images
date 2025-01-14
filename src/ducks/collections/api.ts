import {Collection} from "chums-types/src/shopify";
import {fetchJSON} from "chums-ui-utils";

export async function fetchCollections():Promise<Collection[]> {
    try {
        const url = '/api/shopify/admin/products/collections.json';
        const response = await fetchJSON<Collection[]>(url);
        return response ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchCollections()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCollections()", err);
        return Promise.reject(new Error('Error in fetchCollections()'));
    }
}
