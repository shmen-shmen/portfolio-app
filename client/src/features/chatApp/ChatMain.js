import React from "react";
import { NavLink } from "react-router-dom";

function ChatMain() {
	return (
		<>
			<NavLink
				to={"/"}
				id="chat-here-exit"
				className="weather-here-nav-btn navlink"
			>
				EXIT
			</NavLink>
			<h1>CHAT MAIN</h1>
		</>
	);
}

export default ChatMain;
