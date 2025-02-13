import { createStore, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers/rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  // localStorage by default

// Set up Redux DevTools extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // persist only the 'user' slice, adjust as needed
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the store with the persisted reducer and middleware
const store = createStore(  
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Create a persistor to persist the store
const persistor = persistStore(store);

export { store, persistor };
