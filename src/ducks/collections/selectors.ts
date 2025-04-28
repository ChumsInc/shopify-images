import {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {selectByIdHelper} from "@/ducks/selectors";

export const selectCollectionsIDs = (state:RootState) => state.collections.ids;
export const selectCollectionsList = (state:RootState) => state.collections.list;
export const selectCollectionsStatus = (state:RootState) => state.collections.status;
export const selectCollectionsCurrentId = (state:RootState) => state.collections.currentId;

export const selectCollectionById = createSelector(
    [selectCollectionsList, selectByIdHelper],
    (list, id) => {
        return list[id] ?? null;
    }
)

export const selectCurrentCollection = createSelector(
    [selectCollectionsList, selectCollectionsCurrentId],
    (list, id) => {
        return !id ? null : (list[id] ?? null);
    }
)

export const selectSortedCollectionsList = createSelector(
    [selectCollectionsIDs, selectCollectionsList],
    (ids, list) => {
        return ids.map(id => list[id] ?? null)
            .filter(collection => !!collection);
    }
)
