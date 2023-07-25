import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchQuote } from "./API";
import categories from "./categories";

const initialState = {
	displayName: "random quote machine",
	display: false,
	isLoading: false,
	quote: {
		author: "Quazaq People",
		quote:
			"Yo Orystar Sheshen Am Qotaqtar Sap Sary Qotaq Sheshen Am Qaldyragan",
	},
	categories,
	category: "no-category",
	// imageIsLoading: false,
	// image: "",
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getNewQuote = createAsyncThunk(
	"randomQuotes/fetchQuote",
	async (category) => {
		try {
			const response = await fetchQuote(category);
			return response;
		} catch (error) {
			console.error(error);
		}
	}
);

// export const getNewImage = createAsyncThunk(
// 	"randomQuotes/fetchImage",
// 	async (category) => {
// 		try {
// 			const response = await fetchImage(category);
// 			return response;
// 		} catch (error) {
// 			console.error(error);
// 		}
// 	}
// );

export const randomQuoteSlice = createSlice({
	name: "randomQuote",
	initialState,
	reducers: {
		show_randomQuote: (state) => {
			state.display = true;
		},
		hide_randomQuote: (state) => {
			state.display = false;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		selectCategory: (state, action) => {
			if (state.category === action.payload) {
				state.category = initialState.category;
			} else {
				state.category = action.payload;
			}
		},
	},
	// The `extraReducers` field lets the slice handle actions defined elsewhere,
	// including actions generated by createAsyncThunk or in other slices.
	extraReducers: (builder) => {
		builder
			.addCase(getNewQuote.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getNewQuote.fulfilled, (state, action) => {
				state.isLoading = false;
				state.quote = action.payload;
			})
			.addCase(getNewQuote.rejected, (state) => {
				state.quote = {
					author: "shmin",
					quote: "for some reason something went wrong somewhere 🥲",
				};
			});
		// .addCase(getNewImage.pending, (state) => {
		// 	state.imageIsLoading = true;
		// })
		// .addCase(getNewImage.fulfilled, (state, action) => {
		// 	state.imageIsLoading = false;
		// 	state.image = action.payload;
		// })
		// .addCase(getNewImage.rejected, (state) => {
		// 	state.quote = {
		// 		author: "shmin",
		// 		quote: "for some reason something went wrong somewhere 🥲",
		// 	};
		// });
	},
});

export const { show_randomQuote, hide_randomQuote, selectCategory } =
	randomQuoteSlice.actions;

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

export default randomQuoteSlice.reducer;
