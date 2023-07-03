import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "25+5 Clock",
	display: true,
	sessionLength: 25,
	breakLength: 5,
	timeRemaining: 25,
	startStop: "start",
	sessionBreak: "session",
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
						if (interval == "session") {
							state.timeRemaining = state.sessionLength;
						}
						break;
					} else return state;

				case "decrement":
					if (state[interval + "Length"] > 1) {
						state[interval + "Length"] = state[interval + "Length"] - 1;
						if (interval == "session") {
							state.timeRemaining = state.sessionLength;
						}
						break;
					} else return state;

				default:
					break;
			}
		},

		reset: () => initialState,

		start: (state, action) => {
			state.timeRemaining = state.sessionLength;
			state.intervalId = action.payload;
			state.startStop = "stop";
		},

		stop: (state) => {
			state.intervalId = initialState.intervalId;
			state.startStop = initialState.startStop;
		},

		tick: (state) => {
			if (state.timeRemaining == 0) {
				if (state.sessionBreak == "session") {
					state.timeRemaining = state.breakLength + 1;
					state.sessionBreak = "break";
				} else if (state.sessionBreak == "break") {
					state.timeRemaining = state.sessionLength + 1;
					state.sessionBreak = "session";
				}
			}
			state.timeRemaining = state.timeRemaining - 1;
		},
	},
});

export const {
	show_twentyFiveClock,
	hide_twentyFiveClock,
	intervalControl,
	reset,
	start,
	stop,
	tick,
} = twentyFiveClockSlice.actions;

export default twentyFiveClockSlice.reducer;
