import React from "react";

function ChatHeader({ user }) {
	const { name } = user;
	return (
		<header className="ChatHeader">
			<span>talking to: </span>
			<h1 className="ChatHeader__name">{name}</h1>
		</header>
	);
}

export default ChatHeader;
