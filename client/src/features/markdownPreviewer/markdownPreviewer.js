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
	const [arrangement, setArrangement] = useState("row");

	if (display) {
		return (
			<section id="markdown-previewer">
				<div id="banner">
					<h1>MARKDOWN PREVIEWER</h1>
					<br />
					<button
						className="btn"
						id="close-btn"
						onClick={() => {
							dispatch(hideMarkdown());
						}}
					>
						✿✦⚛︎✕✞♱
					</button>
					<br />
					<br />
					<button
						className="btn"
						id="turn-btn"
						onClick={() => {
							arrangement == "row"
								? setArrangement("column")
								: setArrangement("row");
						}}
					>
						{arrangement == "row" ? "☟☟☟☟☟" : "☞☞☞☞☞"}
					</button>
				</div>
				<div id={"work-area-" + arrangement}>
					<button
						id="show-editor"
						className={`top-level ${"top-level-" + arrangement} ${
							showEditor ? "top-level-narrow" : "top-level-wide"
						}`}
						onClick={() => {
							setShowEditor(!showEditor);
						}}
					>
						{showEditor ? "hide editor" : "show editor"}
					</button>
					{showEditor ? (
						<textarea
							className={`editor ${"editor-" + arrangement} `}
							value={input}
							onChange={(e) => {
								dispatch(editing(e.target.value));
							}}
						></textarea>
					) : (
						<div className={"separator-" + arrangement}></div>
					)}
					<button
						id="show-preview"
						className={`top-level ${"top-level-" + arrangement} ${
							showPreview ? "top-level-narrow" : "top-level-wide"
						}`}
						onClick={() => {
							setShowPreview(!showPreview);
						}}
					>
						{showPreview ? "hide preview" : "show preview"}
					</button>
					{showPreview ? (
						<div
							className={`preview ${"preview-" + arrangement}`}
							dangerouslySetInnerHTML={createMarkup()}
						/>
					) : (
						<div className="separator"></div>
					)}
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default MarkdownPreviewer;
