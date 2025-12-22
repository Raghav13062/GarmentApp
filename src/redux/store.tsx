// // store.ts

// import {combineReducers, configureStore} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {persistReducer, persistStore} from 'redux-persist';

// // Import your reducers (ensure these have proper types if needed)
// import AuthReducer from './feature/authSlice';
// import FeatureReducer from './feature/featuresSlice';

// // Combine reducers
// const reducers = combineReducers({
//   auth: AuthReducer,
//   feature: FeatureReducer,
// });

// // Persist config
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   whitelist: ['auth'],
// };

// // Create persisted reducer
// const persistedReducer = persistReducer(persistConfig, reducers);

// // Setup store with TypeScript types
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
// });

// // Persistor
// const persistor = persistStore(store);

// // Export store and persistor
// export {store, persistor};

// // Infer RootState and AppDispatch types from the store itself
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import AuthReducer from './feature/authSlice';
import featureReducer from './feature/getSliceUser';

// Redux Persist Configuration
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only auth state
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: AuthReducer,
  feature: featureReducer,
});

// Apply Persist Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure Store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Avoid serialization issues
    }),
});

// Persist Store
const persistor = persistStore(store);

// Debugging: Check Persisted State
persistor.subscribe(() => {
  AsyncStorage.getItem('persist:root').then((data) => {
   });
});

export { store, persistor };
