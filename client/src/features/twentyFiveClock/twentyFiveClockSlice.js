import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "25+5 Clock",
	display: true,
	sessionLength: 25,
	breakLength: 5,
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

		intervalControl: (state, action) => {
			const { interval, operation } = action.payload;

			switch (operation) {
				case "increment":
					state[interval + "Length"] = state[interval + "Length"] + 1;
					break;

				case "decrement":
					state[interval + "Length"] = state[interval + "Length"] - 1;
					break;

				default:
					break;
			}
		},

		intervalReset: (state) => {
			state.sessionLength = initialState.sessionLength;
			state.breakLength = initialState.breakLength;
		},
	},
});

export const {
	show_twentyFiveClock,
	hide_twentyFiveClock,
	intervalControl,
	intervalReset,
} = twentyFiveClockSlice.actions;

export default twentyFiveClockSlice.reducer;
