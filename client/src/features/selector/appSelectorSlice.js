import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	randomQuoteMachine: false,
};

export const appSelectorSlice = createSlice({
	name: "appSelector",
	initialState,
	reducers: {
		turnOn: (state, action) => {
			state[action.payload] = true;
		},
		turnOff: (state, action) => {
			state[action.payload] = false;
		},
	},
});

export const { turnOn, turnOff } = appSelectorSlice.actions;

export default appSelectorSlice.reducer;
