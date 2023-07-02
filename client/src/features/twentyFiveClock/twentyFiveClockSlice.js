import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "25+5 Clock",
	display: false,
};

export const twentyFiveClockSlice = createSlice({
	name: "twentyFiveClock",
	initialState,
	reducers: {
		show_twentyFiveClock: (state) => {
			state.display = true;
		},

		hide_twentyFiveClock: (state) => {
			state.display = false;
		},
	},
});

export const { show_twentyFiveClock, hide_twentyFiveClock } =
	twentyFiveClockSlice.actions;

export default twentyFiveClockSlice.reducer;
