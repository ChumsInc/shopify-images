import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "@/ducks/alerts";
import {default as collectionsSlice} from "../ducks/collections";
import {default as productsSlice} from "@/ducks/products";
import {default as imagesSlice} from "@/ducks/media";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    [collectionsSlice.reducerPath]: collectionsSlice.reducer,
    [imagesSlice.reducerPath]: imagesSlice.reducer,
    [productsSlice.reducerPath]: productsSlice.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActionPaths: ['payload.error']
        }
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
