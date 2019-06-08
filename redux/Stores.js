import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './Auth';
import temp from './Temp';

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, auth);

export const authStore = createStore(persistedReducer);
export const authPersistor = persistStore(authStore);

export const tempStore = createStore(temp);

/*export default () => {
	let store = createStore(persistedReducer)
	let persistor = persistStore(store)
	return { store, persistor }
}*/