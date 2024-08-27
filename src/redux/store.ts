import {configureStore} from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import contactsReducer from "@/redux/reducers/contactsReducer";
import isEditingReducer from "@/redux/reducers/isEditingReducer";
import isSearchingReducer from "@/redux/reducers/isSearchingReducer";
import userReducer from "@/redux/reducers/userReducer";

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, userReducer)

export const store = configureStore({
    reducer: {
        persistedReducer,
        contacts: contactsReducer,
        isEditing: isEditingReducer,
        isSearching: isSearchingReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch