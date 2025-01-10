import {Product, ProductVariant} from 'chums-types/src/shopify'
import {createReducer} from "@reduxjs/toolkit";
import {
    loadProducts,
    setCurrentProduct, setCurrentVariant,
    setIncludeInactive,
    setProductSort,
    setShowProducts,
    setVariantSort
} from "_ducks/products/actions";
import {productSorter} from "_ducks/products/utils";
import {dismissAlert} from "_ducks/alerts";
import {SortProps} from "chums-types";

export interface ProductFilter {
    includeInactive: boolean;
    showProducts: boolean;
}

export interface ProductsState {
    list: Record<string, Product>;
    status: 'idle' | 'loading' | 'rejected' | 'saving';
    currentId: string;
    currentVariantId: string;
    productSort: SortProps<Product>;
    variantSort: SortProps<ProductVariant>;
    filters: ProductFilter;
}

export const initialState: ProductsState = {
    list: {},
    status: 'idle',
    currentId: '',
    currentVariantId: '',
    productSort: {field: 'handle', ascending: true},
    variantSort: {field: 'sku', ascending: true},
    filters: {
        includeInactive: false,
        showProducts: false,
    }
}

const productsReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadProducts.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = {};
            action.payload
                .sort(productSorter({field: 'handle', ascending: true}))
                .forEach(product => {
                    state.list[product.id] = product;
                });
        })
        .addCase(loadProducts.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(dismissAlert, (state, action) => {
            if (action.payload.context === loadProducts.typePrefix) {
                state.status = 'idle';
            }
        })
        .addCase(setCurrentProduct, (state, action) => {
            state.currentId = action.payload;
            state.currentVariantId = '';
        })
        .addCase(setCurrentVariant, (state, action) => {
            state.currentVariantId = action.payload;
        })
        .addCase(setVariantSort, (state, action) => {
            state.variantSort = action.payload;
        })
        .addCase(setProductSort, (state, action) => {
            state.productSort = action.payload;
        })
        .addCase(setIncludeInactive, (state, action) => {
            state.filters.includeInactive = action.payload;
        })
        .addCase(setShowProducts, (state, action) => {
            state.filters.showProducts = action.payload;
        })
});

export default productsReducer;
