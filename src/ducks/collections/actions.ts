import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCollections} from "./api";
import type {Collection} from "chums-types/shopify";
import type {RootState} from "@/app/configureStore";
import {selectCollectionsStatus} from "@/ducks/collections/index";

export const loadCollections = createAsyncThunk<Collection[], void, { state: RootState }>(
    'collections/load',
    async () => {
        return await fetchCollections();
    },
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCollectionsStatus(state) === 'idle';
        }
    }
)
