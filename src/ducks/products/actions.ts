import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchProductOptions, fetchProducts} from "@/ducks/products/api";
import {Product} from "chums-types/src/shopify";
import {RootState} from "@/app/configureStore";
import {selectProductsStatus} from "@/ducks/products/index";

export const loadProducts = createAsyncThunk<Product[], FetchProductOptions | undefined, { state: RootState }>(
    'products/load',
    async (arg?: FetchProductOptions) => {
        return await fetchProducts(arg)
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectProductsStatus(state) === 'idle';
        }
    }
)

