import {Product, ProductVariant} from 'chums-types/src/shopify'
import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loadProducts} from "@/ducks/products/actions";
import {productSorter, productVariantSorter} from "@/ducks/products/utils";
import {dismissAlert} from "@/ducks/alerts";
import {SortProps} from "chums-types";
import {selectCurrentCollection, setCurrentCollectionId} from "@/ducks/collections";

const productAdapter = createEntityAdapter<Product, string>({
    selectId: (product) => product.id,
    sortComparer: productSorter({field: "id", ascending: true}),
});
const selectors = productAdapter.getSelectors();


export interface ProductFilter {
    includeInactive: boolean;
    showProducts: boolean;
    variantFilter: string;
}

export interface ProductsState {
    status: 'idle' | 'loading' | 'rejected' | 'saving';
    currentId: string;
    currentHandle: string;
    currentVariantId: string;
    productSort: SortProps<Product>;
    variantSort: SortProps<ProductVariant>;
    filters: ProductFilter;
}

export const initialState: ProductsState = {
    status: 'idle',
    currentId: '',
    currentHandle: '',
    currentVariantId: '',
    productSort: {field: 'handle', ascending: true},
    variantSort: {field: 'sku', ascending: true},
    filters: {
        includeInactive: false,
        showProducts: false,
        variantFilter: '',
    }
}

const index = createSlice({
    name: 'products',
    initialState: productAdapter.getInitialState(initialState),
    reducers: {
        setCurrentProductId: (state, action: PayloadAction<string>) => {
            state.currentId = action.payload;
            state.currentVariantId = '';
            state.filters.variantFilter = '';
        },
        setCurrentProductHandle: (state, action: PayloadAction<string>) => {
            state.currentHandle = action.payload;
            state.currentId = '';
            const list = selectors.selectAll(state);
            const [current] = list.filter(p => p.handle === action.payload);
            if (current) {
                state.currentId = current.id;
            }
            state.currentVariantId = '';
            state.filters.variantFilter = '';
        },
        setCurrentVariant: (state, action: PayloadAction<string>) => {
            state.currentVariantId = action.payload;
        },
        setVariantSort: (state, action: PayloadAction<SortProps<ProductVariant>>) => {
            state.variantSort = action.payload;
        },
        setProductSort: (state, action: PayloadAction<SortProps<Product>>) => {
            state.productSort = action.payload;
        },
        setIncludeInactive: (state, action: PayloadAction<boolean>) => {
            state.filters.includeInactive = action.payload;
        },
        setShowProducts: (state, action: PayloadAction<boolean>) => {
            state.filters.showProducts = action.payload;
        },
        setVariantFilter: (state, action: PayloadAction<string>) => {
            state.filters.variantFilter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProducts.fulfilled, (state, action) => {
                state.status = 'idle';
                productAdapter.setAll(state, action.payload);
                if (state.currentHandle && !state.currentId) {
                    const [current] = action.payload.filter(p => p.handle === state.currentHandle);
                    if (current) {
                        state.currentId = current.id;
                    } else {
                        state.currentHandle = ''
                    }
                }
            })
            .addCase(loadProducts.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('products/')) {
                    state.status = 'idle';
                }
            })
            .addCase(setCurrentCollectionId, (state) => {
                state.currentId = '';
                state.currentHandle = '';
                state.currentVariantId = '';
            })
    },
    selectors: {
        selectProductList: selectors.selectAll,
        selectProductsStatus: (state) => state.status,
        selectCurrentProductId: (state) => state.currentId,
        selectCurrentProductHandle: (state) => state.currentHandle,
        selectProductSort: (state) => state.productSort,
        selectVariantSort: (state) => state.variantSort,
        selectIncludeInactive: (state) => state.filters.includeInactive,
        selectShowProducts: (state) => state.filters.showProducts,
        selectVariantFilter: (state) => state.filters.variantFilter,
    }
});

export const {
    setCurrentProductId,
    setCurrentProductHandle,
    setCurrentVariant,
    setVariantFilter,
    setVariantSort,
    setProductSort,
    setIncludeInactive,
    setShowProducts
} = index.actions;

export const {
    selectProductsStatus,
    selectProductSort,
    selectShowProducts,
    selectCurrentProductId,
    selectCurrentProductHandle,
    selectVariantSort,
    selectProductList,
    selectIncludeInactive,
    selectVariantFilter,
} = index.selectors;

export const selectCurrentProduct = createSelector(
    [selectCurrentProductId, selectProductList],
    (id, list) => {
        return list.find(item => item.id === id) ?? null;
    }
)

export const selectCurrentVariants = createSelector(
    [selectCurrentProduct],
    (product) => {
        return product?.variants ?? []
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
    [selectCurrentVariants, selectVariantFilter, selectVariantSort],
    (variants, search, sort) => {
        return variants
            .filter(v => !search?.trim()
                || v.sku.toLowerCase().includes(search.toLowerCase())
                || v.title.toLowerCase().includes(search.toLowerCase())
            )
            .sort(productVariantSorter(sort))
    }
)

export default index;
