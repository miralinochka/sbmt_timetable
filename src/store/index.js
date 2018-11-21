import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['isLoading'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, applyMiddleware(thunk));
  const persistor = persistStore(store);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers'); // eslint-disable-line 
      store.replaceReducer(nextRootReducer);
    });
  }

  return { store, persistor };
}
