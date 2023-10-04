import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import Chats from "./Chats";
import MessageInput from "./MessageInput";

const ChatWindow = ({ activeUserId }) => {
	const activeUser = useSelector((state) => state.chat.contacts[activeUserId]);

	return (
		<div className="ChatWindow">
			<ChatHeader user={activeUser}></ChatHeader>
			<Chats activeUserId={activeUserId}></Chats>
			<MessageInput></MessageInput>
		</div>
	);
};

export default ChatWindow;
