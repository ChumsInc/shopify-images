import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import type {MediaChange, ProductMedia} from "@/types/media";
import {getProductMedia, postUnlinkProductMedia, putProductMedia, type UnlinkProductMediaArg} from "@/ducks/media/api";
import {type RootState} from "@/app/configureStore";
import {selectHasPendingSaves, selectImagesStatus, selectMediaStatusById} from "@/ducks/media/index";
import type {Product} from "chums-types/shopify";

export const saveMediaChange = createAsyncThunk<ProductMedia | null, MediaChange, { state: RootState }>(
    'media/saveMediaChange',
    async (arg) => {
        return await putProductMedia(arg);
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectMediaStatusById(state, arg.id) === 'idle';
        }
    }
)

export const loadProductMedia = createAsyncThunk<ProductMedia[], Product, { state: RootState }>(
    'media/loadProductMedia',
    async (arg) => {
        return getProductMedia(arg.handle);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectImagesStatus(state) === 'idle' && !selectHasPendingSaves(state);
        }
    }
)
export const loadMedia = createAsyncThunk<ProductMedia[], void, { state: RootState }>(
    'media/loadMedia',
    async () => {
        return getProductMedia();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectImagesStatus(state) === 'idle' && !selectHasPendingSaves(state);
        }
    }
)

export const receiveMedia = createAction<ProductMedia[]>('media/receiveMedia');

export const unlinkProductMedia = createAsyncThunk<ProductMedia[], UnlinkProductMediaArg, { state: RootState }>(
    'media/unlinkProductMedia',
    async (arg) => {
        return await postUnlinkProductMedia(arg);
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectImagesStatus(state) === 'idle' && !selectHasPendingSaves(state);
        }
    }
)
