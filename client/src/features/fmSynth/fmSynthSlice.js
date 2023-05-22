import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	displayName: "FM synthesizer",
	display: true,
};

export const fmSynthSlice = createSlice({
	name: "fmSynth",
	initialState,
	reducers: {
		show_fmSynth: (state) => {
			state.display = true;
		},
		hide_fmSynth: (state) => {
			state.display = false;
		},
	},
});

export const { show_fmSynth, hide_fmSynth } = fmSynthSlice.actions;

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

export default fmSynthSlice.reducer;
