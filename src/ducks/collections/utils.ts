import {SortProps} from "chums-types";
import {Collection} from "chums-types/src/shopify";

export const collectionsSorter = ({field, ascending}: SortProps<Collection>) => (a: Collection, b: Collection):number => {
    const sortMod = ascending ? 1 : -1;
    switch (field) {
        case 'id':
        case 'handle':
        case 'updatedAt':
        case 'productsCount':
            return (
                a[field] === b[field]
                    ? (a.gid > b.gid ? -1 : 1)
                    : (a[field] > b[field] ? 1 : -1)
            ) * sortMod;
        case 'gid':
        default:
            return (a.gid > b.gid ? -1 : 1) * sortMod;
    }
}
