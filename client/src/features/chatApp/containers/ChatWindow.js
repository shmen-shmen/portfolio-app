import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "../components/ChatHeader";
import Chats from "./Chats";
import MessageInput from "./MessageInput";
import { toggleMessageSubmenu, abortEditChatMessage } from "../chatSlice";

const ChatWindow = ({ activeContactId }) => {
	const activeUser = useSelector(
		(state) => state.chat.contacts[activeContactId]
	);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(toggleMessageSubmenu(false));
		dispatch(abortEditChatMessage());
	}, [activeUser]);

	return (
		<div className="ChatWindow">
			<ChatHeader user={activeUser}></ChatHeader>
			<Chats activeContactId={activeContactId}></Chats>
			<MessageInput></MessageInput>
		</div>
	);
};

export default ChatWindow;
