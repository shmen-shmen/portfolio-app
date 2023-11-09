import { configureStore } from "@reduxjs/toolkit";
import randomQuoteSlice from "../features/randomQuoteMachine/randomQuoteSlice.js";
import markdownSlice from "../features/markdownPreviewer/markdownPreviewerSlice.js";
import drumMachineSlice from "../features/drumMachine/drumMachineSlice.js";
import calculatorSlice from "../features/calculator/calculatorSlice.js";
import twentyFiveClockSlice from "../features/twentyFiveClock/twentyFiveClockSlice.js";
import weatherHereSlice from "../features/weatherHere/weatherSlice.js";
import chatSlice from "../features/chatApp/chatSlice.js";

export const store = configureStore({
	reducer: {
		randomQuote: randomQuoteSlice,
		markdownPreviewer: markdownSlice,
		drumMachine: drumMachineSlice,
		calculator: calculatorSlice,
		twentyFiveClock: twentyFiveClockSlice,
		weatherHere: weatherHereSlice,
		chat: chatSlice,
	},
});
