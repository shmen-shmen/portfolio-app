import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const actx = new AudioContext();
// const alarmVolume = actx.createGain();
// alarmVolume.gain.value = 0.5;
// const out = actx.destination;
// alarmVolume.connect(out);
// const alarmSource = actx.createBufferSource();

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
	activeAlarm: "sheep",
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

// const playAlarm = createAsyncThunk("fetchAlarmFile", async (state) => {
// 	const alarm = state.activeAlarm;
// 	const response = await fetch(`sounds/tortTulikMal/${alarm}.wav`);
// 	const soundBuffer = await response.arrayBuffer();
// 	const alarmBuffer = await actx.decodeAudioData(soundBuffer);
// 	alarmSource.buffer = alarmBuffer;
// 	alarmSource.connect(alarmVolume);
// 	alarmSource.start();
// });

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
					if (state[interval + "Length"] < 3600000) {
						state[interval + "Length"] = state[interval + "Length"] + 60000;
						if (interval == "session") {
							state.timeRemaining = state.sessionLength;
						}
						break;
					} else return state;

				case "decrement":
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

		reset: () => initialState,

		start: (state, action) => {
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
