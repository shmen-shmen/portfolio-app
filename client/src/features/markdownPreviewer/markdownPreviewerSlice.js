import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marked } from "marked";
import fetchMarkdown from "./markdownAPI.js";

export const getMarkdown = createAsyncThunk(
	"randomQuotes/getMarkdown",
	async () => {
		try {
			const response = await fetchMarkdown();
			return response;
		} catch (error) {
			console.error(error);
			return;
		}
	}
);

const parseOptions = {
	breaks: true,
	gfm: true,
};
marked.use(parseOptions);

const markdownTranslator = (markdown) => {
	return marked.parse(
		markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
	);
};

const initialState = {
	display: true,
	isLoading: false,
	input: "",
	output: "",
};

const markdownSlice = createSlice({
	name: "markdownPreviewer",
	initialState,
	reducers: {
		showMarkdown: (state) => {
			state.display = true;
		},
		hideMarkdown: (state) => {
			state.display = false;
		},
		editing: (state, action) => {
			state.input = action.payload;
		},
		parsing: (state) => {
			state.output = markdownTranslator(state.input);
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getMarkdown.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMarkdown.fulfilled, (state, action) => {
				state.isLoading = false;
				state.input = action.payload;
			});
	},
});

export const { showMarkdown, hideMarkdown, editing, parsing } =
	markdownSlice.actions;

export default markdownSlice.reducer;
