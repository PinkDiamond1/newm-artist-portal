import { combineReducers, configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import newmApi, { cloudinaryApi, lambdaApi } from "api";
import { contentReducer } from "modules/content";
import { playlistReducer } from "modules/playlist";
import { sessionReducer } from "modules/session";
import { songReducer } from "modules/song";
import { enableReduxLogging, isProd } from "buildParams";
import { uiReducer } from "modules/ui";
import { walletReducer } from "modules/wallet";

const sessionPersistConfig = {
  key: "session",
  storage,
  whitelist: ["verificationPingStartedAt"],
};

export const reducer = combineReducers({
  content: contentReducer,
  playlist: playlistReducer,
  session: persistReducer(sessionPersistConfig, sessionReducer),
  song: songReducer,
  ui: uiReducer,
  wallet: walletReducer,
  [newmApi.reducerPath]: newmApi.reducer,
  [lambdaApi.reducerPath]: lambdaApi.reducer,
  [cloudinaryApi.reducerPath]: cloudinaryApi.reducer,
});

const store = configureStore({
  devTools: !isProd,
  middleware: (getDefaultMiddleware) => {
    const baseMiddleware = [
      ...getDefaultMiddleware(),
      newmApi.middleware,
      lambdaApi.middleware,
      cloudinaryApi.middleware,
    ];
    return enableReduxLogging ? baseMiddleware.concat(logger) : baseMiddleware;
  },
  reducer,
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
