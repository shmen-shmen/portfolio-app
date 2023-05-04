import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	hideMarkdown,
	editing,
	parsing,
	getMarkdown,
} from "./markdownPreviewerSlice";
import "./markdownPreviewer.css";

const MarkdownPreviewer = () => {
	const { display, input, output } = useSelector(
		(state) => state.markdownPreviewer
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(parsing());
	}, [input]);

	useEffect(() => {
		dispatch(getMarkdown());
	}, []);

	function createMarkup() {
		return { __html: output };
	}

	if (display) {
		return (
			<section id="markdown-previewer">
				<h1
					onClick={() => {
						dispatch(hideMarkdown());
					}}
				>
					THIS IS MARKDOWN PREVIEWER
				</h1>
				<h2>this is editor:</h2>
				<textarea
					name=""
					id="editor"
					value={input}
					onChange={(e) => {
						dispatch(editing(e.target.value));
					}}
				></textarea>
				<h2>this is preview:</h2>
				<div id="preview" dangerouslySetInnerHTML={createMarkup()} />
			</section>
		);
	} else {
		return null;
	}
};

export default MarkdownPreviewer;
