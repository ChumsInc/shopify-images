import {createEntityAdapter, createSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {MediaChange, ProductMedia} from "@/src/types/media";
import {loadMedia, loadProductMedia, receiveMedia, saveMediaChange, unlinkProductMedia} from "@/ducks/media/actions";
import {dismissAlert} from "@/ducks/alerts";
import {SortProps} from "chums-types";
import {Image} from "chums-types/src/shopify";
import {selectCurrentProductId} from "@/ducks/products";
import {mediaSorter} from "@/ducks/media/utils";

const imagesAdapter = createEntityAdapter<ProductMedia, string>({
    selectId: (media) => media.id,
    sortComparer: (a, b) => a.id.localeCompare(b.id),
});

const selectors = imagesAdapter.getSelectors();

export interface ImagesState {
    status: 'idle' | 'loading' | 'rejected' | 'saving'|'removing';
    mediaStatus: Record<string, 'idle' | 'saving'>
    changes: Record<string, string>;
    sort: SortProps<ProductMedia | Image>
}

export const initialState: ImagesState = {
    status: 'idle',
    mediaStatus: {},
    changes: {},
    sort: {field: 'id', ascending: true},
}

const imagesSlice = createSlice({
    name: 'media',
    initialState: imagesAdapter.getInitialState(initialState),
    reducers: {
        setMediaSort: (state, action: PayloadAction<SortProps<ProductMedia | Image>>) => {
            state.sort = action.payload;
        },
        setMediaChange: (state, action: PayloadAction<MediaChange>) => {
            state.changes[action.payload.id] = action.payload.alt;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadMedia.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadMedia.fulfilled, (state, action) => {
                state.status = 'idle';
                imagesAdapter.setAll(state, action.payload);
                state.mediaStatus = {};
                state.changes = {};
            })
            .addCase(loadMedia.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(loadProductMedia.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadProductMedia.fulfilled, (state, action) => {
                state.status = 'idle';
                const arrived = action.payload.map(item => item.id);
                const existing = selectors.selectAll(state)
                    .filter(img => img.product_id === action.meta.arg.id)
                    .filter(img => !arrived.includes(img.id));
                imagesAdapter.removeMany(state, existing.map(img => img.id));
                imagesAdapter.setMany(state, action.payload);
            })
            .addCase(loadProductMedia.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(unlinkProductMedia.pending, (state) => {
                state.status = 'removing';
            })
            .addCase(unlinkProductMedia.fulfilled, (state, action) => {
                state.status = 'idle';
                imagesAdapter.removeOne(state, action.meta.arg.mediaId);
                imagesAdapter.setMany(state, action.payload);
            })
            .addCase(unlinkProductMedia.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(receiveMedia, (state, action) => {
                imagesAdapter.setMany(state, action.payload);
                action.payload.forEach((item) => {
                    if (state.changes[item.id]) {
                        delete state.changes[item.id];
                    }
                })
            })
            .addCase(saveMediaChange.pending, (state, action) => {
                state.mediaStatus[action.meta.arg.id] = 'saving';
            })
            .addCase(saveMediaChange.fulfilled, (state, action) => {
                state.mediaStatus[action.meta.arg.id] = 'idle';
                if (action.payload) {
                    imagesAdapter.upsertOne(state, action.payload);
                    delete state.changes[action.payload.id];
                    delete state.mediaStatus[action.payload.id];
                }
            })
            .addCase(saveMediaChange.rejected, (state, action) => {
                state.mediaStatus[action.meta.arg.id] = 'idle';
            })
            .addCase(dismissAlert, (state, action) => {
                if (action.payload.context?.startsWith('images/')) {
                    state.status = 'idle';
                }
            })
    },
    selectors: {
        selectImagesStatus: (state) => state.status,
        selectMediaStatus: (state) => state.mediaStatus,
        selectMediaSort: (state) => state.sort,
        selectImageChanges: (state) => state.changes,
        selectAllImages: selectors.selectAll,
        selectImageSort: (state) => state.sort,
        selectImageById: (state, id) => selectors.selectById(state, id) ?? null,
        selectChangeById: (state, id) => state.changes[id] ?? null,
        selectMediaStatusById: (state, id) => state.mediaStatus[id] ?? 'idle',
        selectHasPendingSaves: (state) => Object.values(state.mediaStatus).some(status => status === 'saving'),
        selectPendingMedia: (state) => Object.values(state.mediaStatus).filter(status => status === 'saving'),
        selectPendingChangesById: (state, id) => state.changes[id],
        selectPendingMediaById: (state, id) => state.mediaStatus[id],
    }
})

export const {setMediaChange, setMediaSort} = imagesSlice.actions;
export const {
    selectAllImages,
    selectImageSort,
    selectImageById,
    selectChangeById,
    selectMediaStatusById,
    selectHasPendingSaves,
    selectPendingChangesById,
    selectMediaSort,
    selectPendingMediaById,
    selectPendingMedia,
    selectImageChanges,
    selectMediaStatus,
    selectImagesStatus,
} = imagesSlice.selectors;

export const selectPendingChanges = createSelector(
    [selectAllImages, selectCurrentProductId, selectImageChanges],
    (images, id, changes):MediaChange[] => {
        if (!id) {
            return [];
        }
        return images
            .filter(item => item.product_id === id)
            .filter(item => (changes[item.id] ?? item.alt) !== item.preview.image.altText)
            .map(item => ({id: item.id, alt: changes[item.id] ?? item.alt}))
    }
)

export const selectProductMedia = createSelector(
    [selectAllImages, selectCurrentProductId, selectImageChanges, selectImageSort],
    (images, id, changes, sort) => {
        if (!id) {
            return [];
        }
        return images
            .filter(item => item.product_id === id)
            .map(item => {
                return changes[item.id]
                    ? {...item, alt: changes[item.id]}
                    : item;
            })
            .sort(mediaSorter(sort))
    }
)

export default imagesSlice;
