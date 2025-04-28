import {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectCurrentCollection} from "@/ducks/collections/selectors";
import {productSorter, productVariantSorter} from "@/ducks/products/utils";
import {selectByIdHelper} from "@/ducks/selectors";

export const selectProductList = (state:RootState) => state.products.list;
export const selectProductsStatus = (state:RootState) => state.products.status;
export const selectCurrentProductId = (state:RootState) => state.products.currentId;
export const selectProductSort = (state:RootState) => state.products.productSort;
export const selectVariantSort = (state:RootState) => state.products.variantSort;
export const selectIncludeInactive = (state:RootState) => state.products.filters.includeInactive;
export const selectShowProducts = (state:RootState) => state.products.filters.showProducts;

export const selectProductById = createSelector(
    [selectProductList, selectByIdHelper],
    (list, id) => {
        return list[id] ?? null;
    }
)

export const selectCurrentProduct = createSelector(
    [selectProductList, selectCurrentProductId],
    (list, id) => {
        return list[id] ?? null;
    }
)

export const selectSortedProducts = createSelector(
    [selectProductList, selectIncludeInactive, selectProductSort, selectCurrentCollection],
    (list, includeInactive, sort, collection) => {
        return Object.values(list)
            .filter(product => includeInactive || product.status === 'ACTIVE')
            .filter(product => !collection || product.collections.includes(collection.handle))
            .sort(productSorter(sort))
    }
)


export const selectSortedVariants = createSelector(
    [selectCurrentProduct, selectVariantSort],
    (product, sort) => {
        if (!product) {
            return [];
        }
        return [...product.variants].sort(productVariantSorter(sort))
    }
)
