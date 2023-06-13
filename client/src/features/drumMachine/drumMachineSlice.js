import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "Drum Machine",
	display: true,
	pads: {
		Q: {
			press: false,
			sample: "HE",
			emoji: "👋",
		},
		W: {
			press: false,
			sample: "BI",
			emoji: "👴🏻",
		},
		E: {
			press: false,
			sample: "IZ",
			emoji: "🧔🏻",
		},
		A: {
			press: false,
			sample: "WN",
			emoji: "🙏",
		},
		S: {
			press: false,
			sample: "5B",
			emoji: "5️⃣🅱️🚀",
		},
		D: {
			press: false,
			sample: "TB",
			emoji: "💣🤯",
		},
		Z: {
			press: false,
			sample: "DO",
			emoji: "🏬",
		},
		X: {
			press: false,
			sample: "CH",
			emoji: "👶",
		},
		C: {
			press: false,
			sample: "SU",
			emoji: "🔥🇺🇦🔥",
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
