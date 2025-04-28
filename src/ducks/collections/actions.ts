import {createAction, createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCollections} from "./api";
import {Collection} from "chums-types/src/shopify";
import {RootState} from "@/app/configureStore";
import {selectCollectionsStatus} from "@/ducks/collections/selectors";

export const setCurrentCollection = createAction<string>('collections/current');
export const loadCollections = createAsyncThunk<Collection[], void, {state:RootState}>(
    'collections/load',
    async () => {
        return await fetchCollections();
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCollectionsStatus(state) === 'idle';
        }
    }
)
