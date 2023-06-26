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
		MRC: "MRC",
		"M+": "M+",
		"M-": "M-",
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
		},

		typingOperators: (state, action) => {
			let last = state.output[state.output.length - 1];

			if (action.payload == last) {
				// prevents entering multiple same operators like '///' '+++' etc
				state.output[state.output.length - 1] = action.payload;
			} else state.output.push(action.payload);
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
				// this weirdness is needed to pass this test:
				// If 2 or more operators are entered consecutively,
				// the operation performed should be the last operator
				// entered (excluding the negative (-) sign.
				const evalArr = [];
				let queuedEl = "";
				state.output.map((el) => {
					if (!["+", "*", "/", "-"].includes(el)) {
						if (queuedEl) {
							evalArr.push(queuedEl);
						}
						evalArr.push(el);
						queuedEl = "";
					} else if (el == "-") {
						queuedEl = queuedEl + el;
					} else queuedEl = el;
				});
				const result = eval(evalArr.join(""));
				state.output = [
					Math.round((result + Number.EPSILON) * 100000) / (100000).toString(),
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
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
