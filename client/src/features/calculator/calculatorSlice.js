import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "calculator",
	display: true,
	input: 0,
	output: 0,
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
		zero: 0,
	},
	controls: {
		equals: "=",
		add: "+",
		subtract: "-",
		multiply: "*",
		divide: "/",
		decimal: ".",
		clear: "AC",
	},
};

export const calculatorSlice = createSlice({
	name: "calculator",
	initialState,

	reducers: {
		show_calculator: (state) => {
			state.display = true;
		},
		hide_calculator: (state) => {
			state.display = false;
		},
		clear_calculator: (state) => {
			state.input = initialState.input;
			state.output = initialState.output;
		},
	},
});

export const { show_calculator, hide_calculator, clear_calculator } =
	calculatorSlice.actions;

export default calculatorSlice.reducer;
