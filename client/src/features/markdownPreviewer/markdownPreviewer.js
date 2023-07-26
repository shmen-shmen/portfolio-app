import React from "react";
import MarkdownMenu from "./markdownMenu";
import MarkdownWorkarea from "./markdownWorkarea";
import "./markdownPreviewer.scss";

const MarkdownPreviewer = () => {
	return (
		<section id="markdown-previewer">
			<MarkdownMenu />
			<MarkdownWorkarea />
		</section>
	);
};

export default MarkdownPreviewer;
