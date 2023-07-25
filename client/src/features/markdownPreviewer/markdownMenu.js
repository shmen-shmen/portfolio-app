import { show_appSelector } from "../appSelector/appSelectorSlice";
import { useDispatch, useSelector } from "react-redux";

import {
	hide_markdownPreviewer,
	flipArrangement,
	wideMenuToggle,
} from "./markdownPreviewerSlice";
import { NavLink } from "react-router-dom";

const MarkdownMenu = () => {
	const { arrangement, wideMenu } = useSelector(
		(state) => state.markdownPreviewer
	);

	const dispatch = useDispatch();

	const handleExit = () => {
		dispatch(hide_markdownPreviewer());
		dispatch(show_appSelector());
	};

	const handleMenuClick = () => {
		if (window.innerWidth > 600) {
			dispatch(wideMenuToggle());
		}
	};

	return (
		<aside
			className={`markdown-menu ${
				wideMenu ? "wide-markdown-menu" : "narrow-markdown-menu"
			}`}
		>
			<NavLink
				to={"/"}
				id="markdown-close-btn"
				className="markdown-btn"
				onClick={handleExit}
			>
				{wideMenu ? "✿✦⚛︎✕✞♱" : "✕"}
			</NavLink>
			<h1 id="markdown-header" onClick={handleMenuClick}>
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
