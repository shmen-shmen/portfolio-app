import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "calculator",
	display: true,
	input: 0,
	output: [0],
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
		clearInput: (state) => {
			state.input = initialState.input;
		},
		typingOperands: (state, action) => {
			const regex = /^[+\-*/]$/;

			let lastIndex = state.output.length - 1;
			let last = state.output[lastIndex];

			if (regex.test(last)) {
				state.output.push(action.payload);
			} else if (last == 0) {
				last = action.payload;
			} else if (last.includes(".") && action.payload == ".") {
				return state;
			} else last += action.payload;

			state.output[lastIndex] = last;
		},
		typingOperators: (state, action) => {
			const regex = /^[+\-*/]$/;

			const lastIndex = state.output.length - 1;
			let last = state.output[lastIndex];

			if (regex.test(last)) {
				if (action.payload == "-" && last !== "-") {
					state.output.push(action.payload);
				} else state.output[lastIndex] = action.payload;
			}
			// if (action.payload == last) {
			// 	state.output[lastIndex] = action.payload;
			// }
			else state.output.push(action.payload);
		},
		equals: (state) => {
			const regex = /^[+\-*/]$/;
			if (regex.test(state.output[state.output.length - 1])) {
				return state;
			} else {
				const inputString = state.output.join("");
				console.log(inputString);
				state.output = eval(inputString);
			}
		},
	},
});

export const {
	show_calculator,
	hide_calculator,
	clear,
	typingOperands,
	typingOperators,
	clearInput,
	equals,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
