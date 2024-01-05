import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import appReducer from "./appReducer";
import adminReducer from "./adminReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import brandReducer from "./brandReducer";
import discountReducer from "./discountReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const userPersistConfig = {
  ...persistCommonConfig,
  key: "user",
  whitelist: ["isLoggedIn", "userInfo"],
};

//Sử dụng redux để chỉnh all language của component trong app
const appPersistConfig = {
  ...persistCommonConfig,
  key: "app",
  whitelist: ["language"],
};

//search combineReducers để hiểu, sử dụng để lưu data dưới local storage
export default (history) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    app: persistReducer(appPersistConfig, appReducer),
    admin: adminReducer,
    category: categoryReducer,
    brand: brandReducer,
    discount: discountReducer,
    product: productReducer,
    order: orderReducer,
  });
