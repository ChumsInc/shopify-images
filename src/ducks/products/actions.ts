import {createAsyncThunk} from "@reduxjs/toolkit";
import {FetchProductOptions, fetchProducts} from "@/ducks/products/api";
import {RootState} from "@/app/configureStore";
import {selectProductsStatus} from "@/ducks/products/index";
import {ProductWithMedia} from "@/src/types/products";

export const loadProducts = createAsyncThunk<ProductWithMedia[], FetchProductOptions | undefined, { state: RootState }>(
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

