import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {FetchProductOptions, fetchProducts} from "@/ducks/products/api";
import {Product, ProductVariant} from "chums-types/src/shopify";
import {RootState} from "@/app/configureStore";
import {selectProductsStatus} from "@/ducks/products/selectors";
import {SortProps} from "chums-types";

export const loadProducts = createAsyncThunk<Product[], FetchProductOptions|undefined, {state:RootState}>(
    'products/load',
    async (arg?:FetchProductOptions) => {
        return await fetchProducts(arg)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectProductsStatus(state) === 'idle';
        }
    }
)

export const setCurrentProduct = createAction<string>('products/setCurrentProduct');
export const setCurrentVariant = createAction<string>('products/setCurrentVariant');
export const setProductSort = createAction<SortProps<Product>>('products/setProductSort');
export const setVariantSort = createAction<SortProps<ProductVariant>>('products/setVariantSort');
export const setIncludeInactive = createAction<boolean>('products/filter/setIncludeInactive');
export const setShowProducts = createAction<boolean>('products/filter/setShowProducts');
