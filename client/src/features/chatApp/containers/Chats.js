import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
import Message from "../components/Message";

function Chats({ activeUserId }) {
	const messages = useSelector((state) => state.chat.messages[activeUserId]);
	const chatsRef = useRef(null);

	useEffect(() => {
		if (chatsRef.current) {
			chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
		}
	}, [messages]);

	const messagesIterator = () => {
		const messagesArr = _.values(messages);
		return messagesArr.map((message) => {
			return (
				<Message
					message={message}
					key={`${message.number}-${activeUserId}`}
				></Message>
			);
		});
	};

	return (
		<div className="Chats" ref={chatsRef}>
			{messagesIterator()}
		</div>
	);
}

export default Chats;
