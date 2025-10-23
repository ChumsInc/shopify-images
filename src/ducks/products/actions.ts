import {createAsyncThunk} from "@reduxjs/toolkit";
import {type FetchProductOptions, fetchProducts} from "@/ducks/products/api";
import {type RootState} from "@/app/configureStore";
import {selectProductsStatus} from "@/ducks/products/index";
import {type ProductWithMedia} from "@/types/products";

export const loadProducts = createAsyncThunk<ProductWithMedia[], FetchProductOptions | undefined, { state: RootState }>(
    'products/load',
    async (arg?: FetchProductOptions) => {
        return await fetchProducts(arg)
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectProductsStatus(state) === 'idle';
        }
    }
)

