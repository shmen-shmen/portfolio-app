import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "25+5 Clock",
	display: true,
	sessionLength: 25,
	breakLength: 5,
	timeRemaining: 0,
	intervalId: 0,
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
					if (state[interval + "Length"] < 60) {
						state[interval + "Length"] = state[interval + "Length"] + 1;
						break;
					} else return state;

				case "decrement":
					if (state[interval + "Length"] > 1) {
						state[interval + "Length"] = state[interval + "Length"] - 1;
						break;
					} else return state;

				default:
					break;
			}
		},

		intervalReset: (state) => {
			state.sessionLength = initialState.sessionLength;
			state.timeRemaining = state.sessionLength;
			state.breakLength = initialState.breakLength;
		},

		start: (state, action) => {
			state.timeRemaining = state.sessionLength;
			state.intervalId = action.payload;
		},

		tick: (state) => {
			state.timeRemaining = state.timeRemaining - 1;
		},

		stop: (state) => {
			state.intervalId = initialState.intervalId;
		},
	},
});

export const {
	show_twentyFiveClock,
	hide_twentyFiveClock,
	intervalControl,
	intervalReset,
	start,
	stop,
	tick,
} = twentyFiveClockSlice.actions;

export default twentyFiveClockSlice.reducer;
