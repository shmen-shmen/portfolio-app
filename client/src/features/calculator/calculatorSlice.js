import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "calculator",
	display: true,
	input: "",
	// output: 0,
	numbers: {
		one: 1,
		two: 2,
		three: 3,
		four: 4,
		five: 5,
		six: 6,
		seven: 7,
		eight: 8,
		nine: 9,
		decimal: ".",
		zero: 0,
	},
	controls: {
		clear: { name: "AC", func: "clear" },
		equals: { name: "=", func: null },
		add: { name: "+", func: null },
		subtract: { name: "-", func: null },
		multiply: { name: "*", func: null },
		divide: { name: "/", func: null },
		hide: { name: "OFF", func: "hide" },
	},
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,

	reducers: {
		show_calculator: (state) => {
			state.display = true;
		},
		hide: (state) => {
			state.display = false;
		},
		clear: (state) => {
			state.input = initialState.input;
			state.output = initialState.output;
		},
		typing: (state, action) => {
			state.input = state.input + action.payload;
		},
	},
});

export const { show_calculator, hide_calculator, typing } =
	calculatorSlice.actions;

export default calculatorSlice.reducer;
