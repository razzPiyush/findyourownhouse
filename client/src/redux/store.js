import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
// import {persistedReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
const rootReducer = combineReducers({user:userReducer});

const persistConfig={
    key : 'root',
    storage,
    version : 1
}

const persistedReducer=persistReducer(persistConfig,rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware:(GetDefaultMiddleware)=>GetDefaultMiddleware ({
    serializableCheck:false
  })
})

export const persistor=persistStore(store);