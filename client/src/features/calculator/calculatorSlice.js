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
		clear: "AC",
		zero: 0,
		decimal: ".",
	},
	controls: {
		divide: { name: "/", func: "/" },
		multiply: { name: "*", func: null },
		subtract: { name: "-", func: null },
		add: { name: "+", func: null },
		equals: { name: "=", func: null },
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
		clear: (state) => {
			state.input = initialState.input;
			state.output = initialState.output;
		},
		typing: (state, action) => {
			state.input = state.input + action.payload;
		},
		equals: (state) => {
			state.input = eval(state.input);
		},
	},
});

export const { show_calculator, hide_calculator, clear, typing, equals } =
	calculatorSlice.actions;

export default calculatorSlice.reducer;
