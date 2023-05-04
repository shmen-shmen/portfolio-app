import React from "react";
import { useDispatch } from "react-redux";
import { showQuotes } from "../features/randomQuoteMachine/randomQuoteSlice";
import { showMarkdown } from "../features/markdownPreviewer/markdownPreviewerSlice";
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
