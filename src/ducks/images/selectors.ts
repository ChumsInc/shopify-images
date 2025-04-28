import {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectByIdHelper} from "@/ducks/selectors";
import {selectCurrentProductId} from "@/ducks/products/selectors";
import {mediaSorter} from "@/ducks/images/utils";
import {MediaChange, ProductMedia} from "@/src/types/media";

export const selectImagesList = (state:RootState) => state.images.list;
export const selectImagesStatus = (state:RootState) => state.images.status;
export const selectMediaStatus = (state:RootState) => state.images.mediaStatus;
export const selectImageChanges = (state:RootState) => state.images.changes;
export const selectImagesSort = (state:RootState) => state.images.sort;

export const selectImageById = createSelector(
    [selectImagesList, selectByIdHelper],
    (list, id):ProductMedia|null => {
        return list[id] ?? null;
    }
)

export const selectChangeById = createSelector(
    [selectImageChanges, selectByIdHelper],
    (list, id) => {
        return list[id] ?? null;
    }
)

export const selectMediaStatusById = createSelector(
    [selectMediaStatus, selectByIdHelper],
    (list, id) => {
        return list[id] ?? 'idle';
    }
)

export const selectHasPendingSaves = createSelector(
    [selectMediaStatus],
    (list) => {
        return Object.keys(list).map(key => list[key] === 'saving').length > 0;
    }
)

export const selectPendingChanges = createSelector(
    [selectImagesList, selectCurrentProductId, selectImageChanges],
    (list, id, changes):MediaChange[] => {
        if (!id) {
            return [];
        }
        return Object.values(list)
            .filter(item => item.product_id === id)
            .filter(item => (changes[item.id] ?? item.alt) !== item.preview.image.altText)
            .map(item => ({id: item.id, alt: changes[item.id] ?? item.alt}))
    }
)

export const selectProductMedia = createSelector(
    [selectImagesList, selectCurrentProductId, selectImageChanges, selectImagesSort],
    (list, id, changes, sort) => {
        if (!id) {
            return [];
        }
        return Object.values(list)
            .filter(item => item.product_id === id)
            .map(item => {
                if (changes[item.id]) {
                    return ({...item, alt: changes[item.id]});
                }
                return item;
            })
            .sort(mediaSorter(sort))
    }
)
