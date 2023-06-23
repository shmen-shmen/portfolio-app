import { createSlice } from "@reduxjs/toolkit";
import pads from "./pads";

const initialState = {
	displayName: "farm machine",
	display: false,
	pads,
	nowPlaying: [],
};

export const drumMachineSlice = createSlice({
	name: "drumMachine",
	initialState,

	reducers: {
		show_drumMachine: (state) => {
			state.nowPlaying = initialState.nowPlaying;
			state.display = true;
		},

		hide_drumMachine: (state) => {
			state.display = false;
		},

		padPress: (state, action) => {
			const pad = action.payload;
			state.pads[pad].press = true;
			const emoji = state.pads[pad]["emoji"];
			if (!state.nowPlaying.includes(emoji)) {
				state.nowPlaying.push(emoji);
			}
		},

		padRelease: (state, action) => {
			const pad = action.payload;
			if (pad in state.pads) {
				state.pads[pad].press = false;
			}
		},

		sampleEnd: (state, action) => {
			const pad = action.payload;
			const emoji = state.pads[pad]["emoji"];
			state.nowPlaying = state.nowPlaying.filter(
				(element) => element !== emoji
			);
		},
	},
});

export const {
	show_drumMachine,
	hide_drumMachine,
	padPress,
	padRelease,
	sampleEnd,
} = drumMachineSlice.actions;

export default drumMachineSlice.reducer;
