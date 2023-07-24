import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { marked } from "marked";
import fetchMarkdown from "./markdownAPI.js";
import DOMPurify from "dompurify";

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
	return DOMPurify.sanitize(
		marked.parse(
			markdown.replace(/^[\u200B\u200C\u200D\u200E\u200F\uFEFF]/, "")
		)
	);
};

const initialState = {
	displayName: "markdown previewer",
	display: false,
	isLoading: false,
	showEditor: true,
	showPreview: true,
	arrangement: "row",
	wideMenu: true,
	input: "",
	output: "",
};

const markdownSlice = createSlice({
	name: "markdownPreviewer",
	initialState,
	reducers: {
		show_markdownPreviewer: (state) => {
			state.display = true;
		},
		hide_markdownPreviewer: (state) => {
			state.display = false;
		},
		editing: (state, action) => {
			state.input = action.payload;
		},
		parsing: (state) => {
			state.output = markdownTranslator(state.input);
		},
		editorToggle: (state) => {
			state.showEditor = !state.showEditor;
		},
		previewToggle: (state) => {
			state.showPreview = !state.showPreview;
		},
		flipArrangement: (state) => {
			state.arrangement === "row"
				? (state.arrangement = "column")
				: (state.arrangement = "row");
		},
		setMobileLayout: (state) => {
			state.arrangement = "column";
			state.wideMenu = false;
		},
		wideMenuToggle: (state) => {
			state.wideMenu = !state.wideMenu;
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

export const {
	show_markdownPreviewer,
	hide_markdownPreviewer,
	editing,
	parsing,
	editorToggle,
	previewToggle,
	flipArrangement,
	wideMenuToggle,
	setMobileLayout,
} = markdownSlice.actions;

export default markdownSlice.reducer;
