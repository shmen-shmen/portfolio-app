import React from "react";
import { useSelector } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import Chats from "./Chats";
import MessageInput from "./MessageInput";

const ChatWindow = ({ activeContactId }) => {
	const activeUser = useSelector(
		(state) => state.chat.contacts[activeContactId]
	);

	return (
		<div className="ChatWindow">
			<ChatHeader user={activeUser}></ChatHeader>
			<Chats activeContactId={activeContactId}></Chats>
			<MessageInput></MessageInput>
		</div>
	);
};

export default ChatWindow;
