import { show_appSelector } from "../appSelector/appSelectorSlice";
import { useDispatch, useSelector } from "react-redux";

import {
	hide_markdownPreviewer,
	flipArrangement,
	wideMenuToggle,
} from "./markdownPreviewerSlice";

const MarkdownMenu = () => {
	const { arrangement, wideMenu } = useSelector(
		(state) => state.markdownPreviewer
	);

	const dispatch = useDispatch();

	const handleExit = () => {
		dispatch(hide_markdownPreviewer());
		dispatch(show_appSelector());
	};

	return (
		<aside
			className={`markdown-menu ${
				wideMenu ? "wide-markdown-menu" : "narrow-markdown-menu"
			}`}
		>
			<button
				id="markdown-close-btn"
				className="markdown-btn"
				onClick={handleExit}
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
		</aside>
	);
};

export default MarkdownMenu;
