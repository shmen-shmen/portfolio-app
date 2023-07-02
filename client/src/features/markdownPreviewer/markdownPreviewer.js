import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	hide_markdownPreviewer,
	editing,
	parsing,
	editorToggle,
	previewToggle,
	flipArrangement,
	wideMenuToggle,
	getMarkdown,
} from "./markdownPreviewerSlice";
import "./markdownPreviewer.css";
import { show_appSelector } from "../appSelector/appSelectorSlice";

const MarkdownPreviewer = () => {
	const {
		display,
		showEditor,
		showPreview,
		arrangement,
		wideMenu,
		input,
		output,
	} = useSelector((state) => state.markdownPreviewer);
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

	const handleExit = () => {
		dispatch(hide_markdownPreviewer());
		dispatch(show_appSelector());
	};

	if (display) {
		return (
			<section id="markdown-previewer">
				<aside
					className={`markdown-menu ${
						wideMenu ? "wide-markdown-menu" : "narrow-markdown-menu"
					}`}
				>
					<div className="menu-wrapper">
						<button
							id="markdown-close-btn"
							className="markdown-btn"
							onClick={handleExit()}
						>
							{wideMenu ? "✿✦⚛︎✕✞♱" : "✕"}
						</button>
						<h1
							id="markdown-header"
							onClick={() => {
								dispatch(wideMenuToggle());
							}}
						>
							MARKDOWN PREVIEWER
						</h1>
						<button
							id="markdown-turn-btn"
							className="markdown-btn"
							onClick={() => {
								dispatch(flipArrangement());
							}}
						>
							{arrangement == "row"
								? wideMenu
									? "☟☟☟☟☟☟"
									: "☟"
								: wideMenu
								? "☞☞☞☞"
								: "☞"}
						</button>
					</div>
				</aside>
				<div id={"work-area-" + arrangement}>
					<button
						id="show-editor"
						className={`submenu-btn ${"submenu-btn-" + arrangement} ${
							showEditor ? "submenu-btn-narrow" : "submenu-btn-wide"
						}`}
						onClick={() => {
							dispatch(editorToggle());
						}}
					>
						EDIT
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
						className={`submenu-btn ${"submenu-btn-" + arrangement} ${
							showPreview ? "submenu-btn-narrow" : "submenu-btn-wide"
						}`}
						onClick={() => {
							dispatch(previewToggle());
						}}
					>
						PREVIEW
					</button>
					{showPreview ? (
						<div
							className={`preview ${"preview-" + arrangement}`}
							dangerouslySetInnerHTML={createMarkup()}
						/>
					) : null}
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default MarkdownPreviewer;
