import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "Drum Machine",
	display: true,
	pads: {
		Q: false,
		W: false,
		E: false,
		A: false,
		S: false,
		D: false,
		Z: false,
		X: false,
		C: false,
	},
	sounds: {
		Q: "",
	},
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
			const pad = action.payload.replace(/^Key/, "");
			if (pad in state.pads) {
				state.pads[pad] = true;
			}
		},
		padRelease: (state, action) => {
			const pad = action.payload.replace(/^Key/, "");
			if (pad in state.pads) {
				state.pads[pad] = false;
			}
		},
	},
});

export const { show_drumMachine, hide_drumMachine, padPress, padRelease } =
	drumMachineSlice.actions;

// // The function below is called a selector and allows us to select a value from
// // the state. Selectors can also be defined inline where they're used instead of
// // in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.counter.value;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
// 	const currentValue = selectCount(getState());
// 	if (currentValue % 2 === 1) {
// 		dispatch(incrementByAmount(amount));
// 	}
// };

export default drumMachineSlice.reducer;
