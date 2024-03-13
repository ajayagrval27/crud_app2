import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { combineReducers } from 'redux'
import formDataReducer from './reducers/formDataSlice'

const persistConfig = {
	key: 'root',
	storage,
}

const rootReducer = combineReducers({
	formData: formDataReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
