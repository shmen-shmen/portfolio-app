import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// *** the web audio API way (going to figure it out)
// const actx = new AudioContext();
// const alarmVolume = actx.createGain();
// alarmVolume.gain.value = 0.5;
// const out = actx.destination;
// alarmVolume.connect(out);
// const alarmSource = actx.createBufferSource();
// const playAlarm = createAsyncThunk("fetchAlarmFile", async (state) => {
// 	const alarm = state.activeAlarm;
// 	const response = await fetch(`sounds/tortTulikMal/${alarm}.wav`);
// 	const soundBuffer = await response.arrayBuffer();
// 	const alarmBuffer = await actx.decodeAudioData(soundBuffer);
// 	alarmSource.buffer = alarmBuffer;
// 	alarmSource.connect(alarmVolume);
// 	alarmSource.start();
// });

const initialState = {
	displayName: "25+5 Clock",
	display: true,
	sessionLength: 1500000,
	breakLength: 300000,
	timeRemaining: 1500000,
	startStop: "start",
	sessionBreak: "session",
	intervalId: 0,
	alarmMenu: false,
	activeAlarm: "dog",
	alarms: [
		"camels",
		"cat",
		"chicken",
		"cows",
		"dog",
		"ducks",
		"goats",
		"horses",
		"sheep",
	],
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
			// increases/decreases breaks and sessions by 1 minute:
			const { interval, operation } = action.payload;

			switch (operation) {
				case "increment":
					// length of an interval cant be more than 60 minutes:
					if (state[interval + "Length"] < 3600000) {
						state[interval + "Length"] = state[interval + "Length"] + 60000;
						if (interval == "session") {
							// updates remaining time:
							state.timeRemaining = state.sessionLength;
						}
						break;
					} else return state;

				case "decrement":
					// length of an interval cant be less than 1 minute:
					if (state[interval + "Length"] > 60000) {
						state[interval + "Length"] = state[interval + "Length"] - 60000;
						if (interval == "session") {
							state.timeRemaining = state.sessionLength;
						}
						break;
					} else return state;

				default:
					break;
			}
		},

		reset: (state) => {
			Object.keys(state).map((key) => {
				if (key !== "display") {
					state[key] = initialState[key];
				}
			});
		},

		start: (state, action) => {
			// interval (timer) id is needed to check if tier is running and to stop timer:
			state.intervalId = action.payload;
			state.startStop = "stop";
		},

		stop: (state) => {
			state.intervalId = initialState.intervalId;
			state.startStop = initialState.startStop;
		},

		tick: (state) => {
			// when session ends break begins, when break ends session begins etc etc etc:
			if (state.timeRemaining == 0) {
				if (state.sessionBreak == "session") {
					state.timeRemaining = state.breakLength + 1000;
					state.sessionBreak = "break";
				} else if (state.sessionBreak == "break") {
					state.timeRemaining = state.sessionLength + 1000;
					state.sessionBreak = "session";
				}
			}
			state.timeRemaining = state.timeRemaining - 1000;
		},

		toggleAlarmMenu: (state, action) => {
			state.alarmMenu = action.payload;
		},

		selectAlarm: (state, action) => {
			state.activeAlarm = action.payload;
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
	toggleAlarmMenu,
	selectAlarm,
} = twentyFiveClockSlice.actions;

export default twentyFiveClockSlice.reducer;
