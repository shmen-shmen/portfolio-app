import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	parsing,
	getMarkdown,
	editorToggle,
	editing,
	previewToggle,
	setMobileLayout,
	hide_markdownPreviewer,
} from "./markdownPreviewerSlice";

import { show_appSelector } from "../appSelector/appSelectorSlice";

const MarkdownWorkarea = () => {
	const { showEditor, showPreview, arrangement, input, output } = useSelector(
		(state) => state.markdownPreviewer
	);
	const dispatch = useDispatch();

	const handleExit = () => {
		dispatch(hide_markdownPreviewer());
		dispatch(show_appSelector());
	};

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleWindowResize() {
			setWindowWidth(window.innerWidth);
		}
		window.addEventListener("resize", handleWindowResize);

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth <= 600) {
			dispatch(setMobileLayout());
		}
	}, [windowWidth]);

	useEffect(() => {
		dispatch(parsing());
	}, [input]);

	useEffect(() => {
		dispatch(getMarkdown());
	}, []);

	function createMarkup() {
		return { __html: output };
	}

	return (
		<div id="work-area" className={arrangement}>
			<div id="close-btn-mobile" onClick={handleExit}>
				x
			</div>
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
	);
};

export default MarkdownWorkarea;
