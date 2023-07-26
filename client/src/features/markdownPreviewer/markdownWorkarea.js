import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	parsing,
	getMarkdown,
	editorToggle,
	editing,
	previewToggle,
	setMobileLayout,
} from "./markdownPreviewerSlice";
import { NavLink } from "react-router-dom";

const MarkdownWorkarea = () => {
	const { showEditor, showPreview, arrangement, input, output } = useSelector(
		(state) => state.markdownPreviewer
	);
	const dispatch = useDispatch();

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
			<NavLink to={"/"} id="close-btn-mobile">
				x
			</NavLink>
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
