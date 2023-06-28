import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "calculator",
	display: true,
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
	basicOperators: {
		divide: "/",
		multiply: "*",
		subtract: "-",
		add: "+",
		equals: "=",
	},
	additionalOperators: {
		OFF: "OFF",
		sqrt: "√",
		percent: "%",
		// MRC: "MRC",
		// "M+": "M+",
		// "M-": "M-",
	},
	output: ["0"],
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
			state.output = initialState.output;
		},

		typingNumbers: (state, action) => {
			// first check if expresson fits the screen
			if (state.output.join("").length < 17) {
				// look at last element in expression
				let last = state.output[state.output.length - 1];
				switch (true) {
					// check if it is an operator:
					case ["+", "*", "/", "-"].includes(last):
						// if so, then start typing new operand:
						state.output.push(action.payload);
						break;
					// prevents numbers starting with 0:
					case last == 0:
						state.output[state.output.length - 1] = action.payload;
						break;
					// prevents numbers having multiple decimal points: 1.2.3.4
					case last.includes(".") && action.payload == ".":
						return state;
					default:
						// otherwise keep typing
						last += action.payload;
						state.output[state.output.length - 1] = last;
				}
			} else return state;
		},

		squareRoot: (state) => {
			if (
				!["+", "*", "/", "-"].includes(state.output[state.output.length - 1])
			) {
				let root = Math.sqrt(state.output[state.output.length - 1]);
				root = (
					Math.round((root + Number.EPSILON) * 100000) / 100000
				).toString();
				state.output[state.output.length - 1] = root;
			} else return state;
		},

		typingOperators: (state, action) => {
			// first check if expresson fits the screen
			if (state.output.join("").length < 17) {
				// then prevent entering multiple same operators like '///' '+++' etc
				if (action.payload == state.output[state.output.length - 1]) {
					state.output[state.output.length - 1] = action.payload;
					return state;
				} else if (
					// if last element is an operator
					["+", "*", "/", "-"].includes(state.output[state.output.length - 1])
				) {
					// and you type '-'
					if (action.payload == "-") {
						// '-' gets added
						state.output.push(action.payload);
					}
					// else string of operatos gets replaced
					else {
						for (let i = state.output.length - 1; i >= 0; i--) {
							if (["+", "*", "/", "-"].includes(state.output[i])) {
								state.output.splice(i, 1);
							} else {
								state.output.push(action.payload);
								return state;
							}
						}
					}
				} // if last element is not an operator, then keep typing
				else {
					state.output.push(action.payload);
				}
			} else return state;
		},

		equals: (state) => {
			// first check if the expression is complete
			if (
				["+", "*", "/", "-", "."].includes(
					state.output[state.output.length - 1]
				)
			) {
				return state;
			} else {
				// eval input array
				const result = eval(state.output.join(""));
				// round to 5th decimal and show answer
				state.output = [
					(Math.round((result + Number.EPSILON) * 100000) / 100000).toString(),
				];
			}
		},
	},
});

export const {
	show_calculator,
	hide_calculator,
	clear,
	typingNumbers,
	typingOperators,
	equals,
	squareRoot,
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
