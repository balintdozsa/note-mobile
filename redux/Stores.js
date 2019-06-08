import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './Auth';

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, auth);

/*const store = createStore(authReducer);
export default store;*/

export const authStore = createStore(persistedReducer);
export const authPersistor = persistStore(authStore);

/*export default () => {
	let store = createStore(persistedReducer)
	let persistor = persistStore(store)
	return { store, persistor }
}*/