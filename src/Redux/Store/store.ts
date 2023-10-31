//======================Store setup ==========================================//
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../services/api';
import authReducer from '../services/auth/authSlice';
import registerReducer from '../services/auth/registerSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { setupListeners } from '@reduxjs/toolkit/query'

const reducers = combineReducers({
    [baseApi.reducerPath]: baseApi.reducer,
    auth: authReducer,
    register:registerReducer
})
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth',"api",],
}
const persistedReducer = persistReducer(persistConfig, reducers)

 const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }}).concat(baseApi.middleware),
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export { store, persistor }
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const purgeStore = ()=>{
  persistor.purge()
  .then(() => {
    return persistor.flush()
  })
  .then(() => {
   /// persistor.pause()
  })
}

//{
    //[api.reducerPath]: api.reducer,
  //   [baseApi.reducerPath]:baseApi.reducer,
  //   auth: authReducer,
  // },