import React from "react";
import { useDispatch } from "react-redux";
import {
	showQuotes,
	hideQuotes,
} from "../features/randomQuoteMachine/randomQuoteSlice";
import {
	showMarkdown,
	hideMarkdown,
} from "../features/markdownPreviewer/markdownPreviewerSlice";
import { showSynth, hideSynth } from "../features/fmSynth/fmSynthSlice";
import "./appSelector.css";
const AppSelector = () => {
	const dispatch = useDispatch();
	return (
		<nav id="nav">
			<button
				id="quotes"
				className="nav nav-button"
				onClick={() => {
					dispatch(showQuotes());
					dispatch(hideMarkdown());
					dispatch(hideSynth());
				}}
			>
				quotes
			</button>
			<p className="nav">・•●◦</p>
			<button
				id="markdown"
				className="nav nav-button"
				onClick={() => {
					dispatch(showMarkdown());
					dispatch(hideQuotes());
					dispatch(hideSynth());
				}}
			>
				markdown
			</button>
			<p className="nav">◎●◦⦿</p>
			<button
				className="nav nav-button"
				onClick={() => {
					dispatch(showSynth());
					dispatch(hideMarkdown());
					dispatch(hideQuotes());
				}}
			>
				synth
			</button>
			<p className="nav">⚈⚉⚆⚇</p>
			<button className="nav nav-button inactive-button">tatari</button>
		</nav>
	);
};

export default AppSelector;
