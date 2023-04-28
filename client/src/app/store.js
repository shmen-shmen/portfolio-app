import { configureStore } from "@reduxjs/toolkit";
import randomQuoteSlice from "../features/randomQuoteMachine/randomQuoteSlice";

export const store = configureStore({
	reducer: {
		randomQuote: randomQuoteSlice,
	},
});
