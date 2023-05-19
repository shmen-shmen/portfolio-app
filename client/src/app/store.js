import { configureStore } from "@reduxjs/toolkit";
import randomQuoteSlice from "../features/randomQuoteMachine/randomQuoteSlice";
import markdownSlice from "../features/markdownPreviewer/markdownPreviewerSlice";
import fmSynthSlice from "../features/fmSynth/fmSynthSlice";

export const store = configureStore({
	reducer: {
		randomQuote: randomQuoteSlice,
		markdownPreviewer: markdownSlice,
		fmSynth: fmSynthSlice,
	},
});
