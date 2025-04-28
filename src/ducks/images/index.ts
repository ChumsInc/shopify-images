import {createReducer} from "@reduxjs/toolkit";
import {ProductMedia} from "@/src/types/media";
import {loadMedia, receiveMedia, saveMediaChange, setMediaChange, setMediaSort} from "@/ducks/images/actions";
import {dismissAlert} from "@/ducks/alerts";
import {SortProps} from "chums-types";
import {Image} from "chums-types/src/shopify";

export interface ImagesState {
    list: Record<string, ProductMedia>;
    status: 'idle' | 'loading' | 'rejected' | 'saving';
    mediaStatus: Record<string, 'idle' | 'saving'>
    changes: Record<string, string>;
    sort: SortProps<ProductMedia>|SortProps<Image>
}

export const initialState: ImagesState = {
    list: {},
    status: 'idle',
    mediaStatus: {},
    changes: {},
    sort: {field: 'id', ascending: true},
}

const imagesReducer = createReducer(initialState, builder => {
    builder
        .addCase(loadMedia.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadMedia.fulfilled, (state, action) => {
            state.list = {};
            state.mediaStatus = {};
            action.payload.forEach((item) => {
                state.list[item.id] = item;
                if (state.changes[item.id]) {
                    delete state.changes[item.id];
                }
            })
        })
        .addCase(loadMedia.rejected, (state) => {
            state.status = 'rejected';
        })
        .addCase(receiveMedia, (state, action) => {
            action.payload.forEach((item) => {
                state.list[item.id] = item;
                if (state.changes[item.id]) {
                    delete state.changes[item.id];
                }
            })
        })
        .addCase(dismissAlert, (state, action) => {
            if (action.payload.context === loadMedia.typePrefix) {
                state.status = 'idle';
            }
        })
        .addCase(saveMediaChange.pending, (state, action) => {
            state.mediaStatus[action.meta.arg.id] = 'saving';
        })
        .addCase(saveMediaChange.fulfilled, (state, action) => {
            state.mediaStatus[action.meta.arg.id] = 'idle';
            if (action.payload) {
                state.list[action.payload.id] = action.payload;
                delete state.changes[action.payload.id];
                delete state.mediaStatus[action.payload.id];
            }
        })
        .addCase(saveMediaChange.rejected, (state, action) => {
            state.mediaStatus[action.meta.arg.id] = 'idle';
        })
        .addCase(setMediaChange, (state, action) => {
            state.changes[action.payload.id] = action.payload.alt;
        })
        .addCase(setMediaSort, (state, action) => {
            state.sort = action.payload;
        })
})

export default imagesReducer;
