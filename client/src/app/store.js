import { configureStore } from "@reduxjs/toolkit";
import appSelectorReducer from "../features/selector/appSelectorSlice";

export const store = configureStore({
	reducer: {
		appSelector: appSelectorReducer,
	},
});
