import { createStore, combineReducers, applyMiddleware } from "redux";
import { persistReducer as pReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import logger from "redux-logger";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { PersistState } from "./persist/persistSlice";
import persist from "./persist/persistSlice";
import hospital, { HospitalState } from "./hospital/hospitalSlice";

export interface StoreStateType {
  persist: PersistState;
  hospital: HospitalState;
}

const rootReducer = combineReducers({
  persist,
  hospital
});

export type AppState = ReturnType<typeof rootReducer>;

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  version: 1,
  whitelist: ["persist"], // select reducer to persist
};
const persistedReducer = pReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(thunk, logger));
const persistor = persistStore(store);

export { store, persistor };