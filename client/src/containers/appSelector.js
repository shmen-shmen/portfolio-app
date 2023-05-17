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
import "./appSelector.css";

const AppSelector = () => {
	const dispatch = useDispatch();
	return (
		<nav id="nav">
			<button
				className="nav nav-button"
				id="quotes"
				onClick={() => {
					dispatch(showQuotes());
					dispatch(hideMarkdown());
				}}
			>
				quotes
			</button>
			<p className="nav">・•●◦</p>
			<button
				className="nav nav-button"
				id="markdown"
				onClick={() => {
					dispatch(showMarkdown());
					dispatch(hideQuotes());
				}}
			>
				markdown
			</button>
			<p className="nav">◎●◦⦿</p>
			<button className="nav nav-button inactive-button ">drums</button>
			<p className="nav">⚈⚉⚆⚇</p>
			<button className="nav nav-button inactive-button">tatari</button>
		</nav>
	);
};

export default AppSelector;
