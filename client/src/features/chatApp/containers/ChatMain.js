import React from "react";
import Empty from "../components/Empty";
import ChatWindow from "./ChatWindow";
import { useSelector } from "react-redux";

function ChatMain() {
	const { user, activeUserId } = useSelector((state) => state.chat);

	return (
		<main className="ChatMain">
			{activeUserId ? <ChatWindow></ChatWindow> : <Empty user={user}></Empty>}
		</main>
	);
}

export default ChatMain;
