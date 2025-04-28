import {Collection} from 'chums-types/src/shopify'
import {createReducer} from "@reduxjs/toolkit";
import {loadCollections, setCurrentCollection} from "@/ducks/collections/actions";
import {collectionsSorter} from "@/ducks/collections/utils";
import {dismissAlert} from "@/ducks/alerts";

export interface CollectionsState {
    ids: string[];
    list: Record<string, Collection>;
    status: 'idle' | 'loading' | 'rejected';
    currentId: string;
}

const initialState: CollectionsState = {
    ids: [],
    list: {},
    status: 'idle',
    currentId: '',
}

const collectionsReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadCollections.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadCollections.fulfilled, (state, action) => {
            state.list = {};
            action.payload.forEach((collection) => {
                state.list[collection.gid] = collection;
            })
            state.ids = action.payload
                .sort(collectionsSorter({field: 'handle', ascending: true}))
                .map(coll => coll.gid);
            state.status = 'idle';
        })
        .addCase(loadCollections.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(setCurrentCollection, (state, action) => {
            state.currentId = action.payload;
        })
        .addCase(dismissAlert, (state, action) => {
            if (action.payload.context === loadCollections.typePrefix) {
                state.status = 'idle';
            }
        })
});

export default collectionsReducer;
