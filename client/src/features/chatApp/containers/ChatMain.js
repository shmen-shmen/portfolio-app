import React from "react";
import Empty from "../components/Empty";
import ChatWindow from "./ChatWindow";
import { useSelector } from "react-redux";

function ChatMain() {
	const { user, activeContactId } = useSelector((state) => state.chat);

	return (
		<main className="ChatMain">
			{activeContactId ? (
				<ChatWindow activeContactId={activeContactId}></ChatWindow>
			) : (
				<Empty user={user}></Empty>
			)}
		</main>
	);
}

export default ChatMain;
