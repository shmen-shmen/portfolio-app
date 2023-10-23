import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Message from "../components/Message";
import { setPreviewValue } from "../chatSlice";

function Chats({ activeContactId }) {
	const messages = useSelector((state) => state.chat.messages[activeContactId]);

	const chatsRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (chatsRef.current) {
			chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		dispatch(setPreviewValue(activeContactId));
	}, [messages]);

	const messagesIterator = () => {
		const messagesArr = _.values(messages);
		return messagesArr.map((message) => {
			return (
				<Message
					message={message}
					key={`${message.number}-${activeContactId}`}
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
