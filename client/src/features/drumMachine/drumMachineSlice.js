import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "drum machine",
	display: false,
	pads: {
		Q: {
			press: false,
			sample: "camels",
			emoji: "🐪🐫",
			link: "https://freesound.org/s/16932/",
		},
		W: {
			press: false,
			sample: "sheep",
			emoji: "🐑🐑🐏",
			link: "https://freesound.org/s/362283/",
		},
		E: {
			press: false,
			sample: "cows",
			emoji: `🐄🐄`,
			link: "https://freesound.org/s/585445/",
		},
		A: {
			press: false,
			sample: "horses",
			emoji: "🐎",
			link: "https://freesound.org/s/502084/",
		},
		S: {
			press: false,
			sample: "goats",
			emoji: "🐐🐐",
			link: "https://freesound.org/s/427814/",
		},
		D: {
			press: false,
			sample: "ducks",
			emoji: "🦆🦆🦆",
			link: "https://freesound.org/s/607226/",
		},
		Z: {
			press: false,
			sample: "chicken",
			emoji: "🐓",
			link: "https://freesound.org/s/187549/",
		},
		X: {
			press: false,
			sample: "cat",
			emoji: "🐈",
			link: "https://freesound.org/s/260881/",
		},
		C: {
			press: false,
			sample: "dog",
			emoji: "🐕",
			link: "https://freesound.org/s/161924/",
		},
	},
	nowPlaying: "",
};

export const drumMachineSlice = createSlice({
	name: "drumMachine",
	initialState,
	reducers: {
		show_drumMachine: (state) => {
			state.display = true;
		},
		hide_drumMachine: (state) => {
			state.display = false;
		},
		padPress: (state, action) => {
			const pad = action.payload;
			if (pad in state.pads) {
				state.pads[pad].press = true;
				state.nowPlaying = state.pads[pad]["emoji"];
			}
		},
		padRelease: (state, action) => {
			const pad = action.payload;
			if (pad in state.pads) {
				state.pads[pad].press = false;
				state.nowPlaying = "";
			}
		},
	},
});

export const { show_drumMachine, hide_drumMachine, padPress, padRelease } =
	drumMachineSlice.actions;

export default drumMachineSlice.reducer;
