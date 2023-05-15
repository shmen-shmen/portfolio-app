import React, { useEffect, useState } from "react";
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

	const [showEditor, setShowEditor] = useState(false);
	const [showPreview, setShowPreview] = useState(false);

	if (display) {
		return (
			<section id="markdown-previewer">
				<div
					id="banner"
					// onClick={() => {
					// 	dispatch(hideMarkdown());
					// }}
				>
					<h1>MARKDOWN PREVIEWER</h1>
					<br />
					<p
						id="close-btn"
						onClick={() => {
							dispatch(hideMarkdown());
						}}
					>
						✿✦⚛︎✕✞♱
					</p>
				</div>

				<h2
					className="top-level"
					onClick={() => {
						setShowEditor(!showEditor);
					}}
				>
					{showEditor ? "" : "edit"}
				</h2>

				{showEditor ? (
					<textarea
						name=""
						id="editor"
						value={input}
						onChange={(e) => {
							dispatch(editing(e.target.value));
						}}
					></textarea>
				) : (
					<div className="separator"></div>
				)}
				<h2
					className="top-level"
					onClick={() => {
						setShowPreview(!showPreview);
					}}
				>
					{showPreview ? "" : "preview"}
				</h2>
				{showPreview ? (
					<div id="preview" dangerouslySetInnerHTML={createMarkup()} />
				) : (
					<div className="separator"></div>
				)}
			</section>
		);
	} else {
		return null;
	}
};

export default MarkdownPreviewer;
