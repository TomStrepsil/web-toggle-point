import objectProxyTogglePoint from "./objectProxyTogglePoint";
import { combineReducers } from "@reduxjs/toolkit";
import { getFeatures } from "../featuresStore";
import { subscribe } from "valtio";

if (CLIENT) {
  subscribe(getFeatures(), () => {
    delete require.cache[require.resolve("@/state/modules")];
    const { default: newReducerMap } = require("@/state/modules");
    const { default: store } = require("@/state/store");
    store.replaceReducer(combineReducers(newReducerMap));
  });
}

export default objectProxyTogglePoint;
