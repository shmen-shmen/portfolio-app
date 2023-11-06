import React, { useEffect, useState } from "react";
import ChatMain from "../containers/ChatMain";
import ChatSidebar from "../containers/ChatSidebar";
import { NavLink } from "react-router-dom";
import "../chat.scss";
import { useSelector } from "react-redux";

function ChatApp() {
	const chatOpen = useSelector((state) => Boolean(state.chat.activeContactId));
	const [smallScreen, setSmallScreen] = useState(window.innerWidth <= 600);
	useEffect(() => {
		const callback = () => {
			setSmallScreen(window.innerWidth <= 600);
		};
		window.addEventListener("resize", callback);
		return () => {
			window.removeEventListener("resize", callback);
		};
	}, []);

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
			{smallScreen ? (
				<>{chatOpen ? <ChatMain></ChatMain> : <ChatSidebar></ChatSidebar>}</>
			) : (
				<>
					<ChatSidebar></ChatSidebar>
					<ChatMain></ChatMain>
				</>
			)}
		</div>
	);
}

export default ChatApp;
