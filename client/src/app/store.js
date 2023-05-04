import { configureStore } from "@reduxjs/toolkit";
import randomQuoteSlice from "../features/randomQuoteMachine/randomQuoteSlice";
import markdownSlice from "../features/markdownPreviewer/markdownPreviewerSlice";

export const store = configureStore({
	reducer: {
		randomQuote: randomQuoteSlice,
		markdownPreviewer: markdownSlice,
	},
});
