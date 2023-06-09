import { configureStore } from "@reduxjs/toolkit";
import randomQuoteSlice from "../features/randomQuoteMachine/randomQuoteSlice";
import markdownSlice from "../features/markdownPreviewer/markdownPreviewerSlice";
import drumMachineSlice from "../features/drumMachine/drumMachineSlice";
import calculatorSlice from "../features/calculator/calculatorSlice";
import twentyFiveClockSlice from "../features/twentyFiveClock/twentyFiveClockSlice";
import appSelectorSlice from "../features/appSelector/appSelectorSlice";

export const store = configureStore({
	reducer: {
		randomQuote: randomQuoteSlice,
		markdownPreviewer: markdownSlice,
		drumMachine: drumMachineSlice,
		calculator: calculatorSlice,
		twentyFiveClock: twentyFiveClockSlice,
		appSelector: appSelectorSlice,
	},
});
