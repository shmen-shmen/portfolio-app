import React from "react";
import { useSelector } from "react-redux";
import MarkdownMenu from "./markdownMenu";
import MarkdownWorkarea from "./markdownWorkarea";
import "./markdownPreviewer.scss";

const MarkdownPreviewer = () => {
	const { display } = useSelector((state) => state.markdownPreviewer);

	if (display) {
		return (
			<section id="markdown-previewer">
				<MarkdownMenu />
				<MarkdownWorkarea />
			</section>
		);
	} else {
		return null;
	}
};

export default MarkdownPreviewer;
