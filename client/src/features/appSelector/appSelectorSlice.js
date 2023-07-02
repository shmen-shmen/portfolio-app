import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "appSelector",
	display: false,
};

export const appSelectorSlice = createSlice({
	name: "appSelector",
	initialState,
	reducers: {
		show_appSelector: (state) => {
			state.display = true;
		},

		hide_appSelector: (state) => {
			state.display = false;
		},
	},
});

export const { show_appSelector, hide_appSelector } = appSelectorSlice.actions;

export default appSelectorSlice.reducer;
