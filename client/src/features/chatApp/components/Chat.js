import React from "react";
import ChatMain from "../containers/ChatMain";
import ChatSidebar from "../containers/ChatSidebar";
import { NavLink } from "react-router-dom";
import "../chat.scss";

function ChatApp() {
	return (
		<div className="ChatApp">
			<nav>
				<NavLink
					to={"/"}
					id="chat-exit-btn"
					className="weather-here-nav-btn navlink"
				>
					EXIT
				</NavLink>
			</nav>
			<ChatSidebar></ChatSidebar>
			<ChatMain></ChatMain>
		</div>
	);
}

export default ChatApp;
