import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {MediaChange, ProductMedia} from "@/src/types/media";
import {getProductMedia, putProductMedia} from "@/ducks/images/api";
import {RootState} from "@/app/configureStore";
import {selectHasPendingSaves, selectImagesStatus, selectMediaStatusById} from "@/ducks/images/selectors";
import {SortProps} from "chums-types";
import {Image} from "chums-types/src/shopify";

export const setMediaChange = createAction<MediaChange>('media/setMediaChange');
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

export const loadMedia = createAsyncThunk<ProductMedia[], void, {state:RootState}>(
    'media/loadMedia',
    async () => {
        return getProductMedia();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectImagesStatus(state) === 'idle' && !selectHasPendingSaves(state);
        }
    }
)

export const receiveMedia = createAction<ProductMedia[]>('media/receiveMedia');

export const setMediaSort = createAction<SortProps<ProductMedia>|SortProps<Image>>('media/setSort');
