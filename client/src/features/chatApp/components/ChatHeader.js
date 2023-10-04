import React from "react";

function ChatHeader({ user }) {
	const { name, status } = user;
	return (
		<header className="ChatHeader">
			<h1 className="ChatHeader__name">{name}</h1>
			<p className="ChatHeader__status">{status}</p>
		</header>
	);
}

export default ChatHeader;
