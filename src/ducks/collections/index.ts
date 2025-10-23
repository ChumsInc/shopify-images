import type {Collection} from 'chums-types/shopify'
import {createEntityAdapter, createSelector, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {loadCollections} from "@/ducks/collections/actions";
import {collectionsSorter} from "@/ducks/collections/utils";
import {dismissAlert} from "@/ducks/alerts";
import type {SortProps} from "chums-types";

const collectionsAdapter = createEntityAdapter<Collection, string>({
    selectId: (collection) => collection.gid,
    sortComparer: collectionsSorter({field: "gid", ascending: true}),
});

const selectors = collectionsAdapter.getSelectors();

export interface CollectionsState {
    status: 'idle' | 'loading' | 'rejected';
    currentId: string;
    currentHandle: string;
    sort: SortProps<Collection>;
}

const initialState: CollectionsState = {
    status: 'idle',
    currentId: '',
    currentHandle: '',
    sort: {field: 'handle', ascending: true},
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: collectionsAdapter.getInitialState(initialState),
    reducers: {
        setCurrentCollectionId: (state, action: PayloadAction<string>) => {
            state.currentId = action.payload;
        },
        setCurrentCollectionHandle: (state, action: PayloadAction<string>) => {
            state.currentHandle = action.payload;
            const [current] = selectors.selectAll(state).filter(c => c.handle === action.payload);
            if (current) {
                state.currentId = current.gid;
            }
        },
        setCollectionSort: (state, action: PayloadAction<SortProps<Collection>>) => {
            state.sort = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(loadCollections.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadCollections.fulfilled, (state, action) => {
                collectionsAdapter.setAll(state, action.payload);
                state.status = 'idle';
                if (state.currentHandle !== '' && !state.currentId) {
                    const [current] = action.payload.filter(item => item.handle === state.currentHandle);
                    if (current) {
                        state.currentId = current.gid;
                    } else {
                        state.currentHandle = ''
                    }
                }
                if (state.currentId === '') {
                    const [current] = action.payload.filter(item => item.handle === 'all-products');
                    state.currentId = current.gid ?? '';
                    state.currentHandle = current.handle ?? '';
                }
            })
            .addCase(loadCollections.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context === loadCollections.typePrefix) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectCollectionsStatus: (state) => state.status,
        selectCollectionsCurrentId: (state) => state.currentId,
        selectCollectionsCurrentHandle: (state) => state.currentHandle,
        selectAllCollections: (state) => selectors.selectAll(state),
        selectCollectionSort: (state) => state.sort,
    }
})

export const {
    setCurrentCollectionId,
    setCollectionSort,
    setCurrentCollectionHandle,
} = collectionsSlice.actions;
export const {
    selectAllCollections,
    selectCollectionsStatus,
    selectCollectionsCurrentId,
    selectCollectionsCurrentHandle,
    selectCollectionSort,
} = collectionsSlice.selectors;

export const selectCurrentCollection = createSelector(
    [selectCollectionsCurrentId, selectAllCollections],
    (id, list) => {
        return list.find(item => item.gid === id) ?? null;
    }
)

export const selectSortedCollectionsList = createSelector(
    [selectAllCollections, selectCollectionSort],
    (list, sort) => {
        return [...list]
            .sort(collectionsSorter(sort))
    }
)
export default collectionsSlice;
