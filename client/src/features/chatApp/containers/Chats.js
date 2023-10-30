import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Message from "../components/Message";
import { setPreviewValue, toggleMessageSubmenu } from "../chatSlice";
import { MessageSubmenu } from "./MessageSubmenu";

function Chats({ activeContactId }) {
	const messages = useSelector((state) => state.chat.messages[activeContactId]);
	const { showMessageSubmenu } = useSelector((state) => state.chat);
	const { typing } = useSelector((state) => state.chat);
	const editing = useSelector((state) => Boolean(state.chat.editing.number));

	const chatsRef = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		if (chatsRef.current) {
			chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
		}
	}, [messages, typing]);

	useEffect(() => {
		dispatch(setPreviewValue(activeContactId));
	}, [messages]);

	const [submenuProps, setSubmenuProps] = useState(null);

	const handleMessagelick = (e, props) => {
		if (editing) {
			return;
		}
		if (showMessageSubmenu) {
			dispatch(toggleMessageSubmenu(false));
			setSubmenuProps(null);
		} else {
			dispatch(toggleMessageSubmenu(true));
			if (props.type !== "text") props.contents = "penis";
			setSubmenuProps({ ...props, position: [e.clientX, e.clientY] });
		}
	};

	const messagesIterator = () => {
		const messagesArr = _.values(messages);
		return messagesArr.map((message) => {
			return (
				<Message
					message={message}
					key={`${message.number}-${activeContactId}`}
					handleMessagelick={handleMessagelick}
				></Message>
			);
		});
	};

	return (
		<div className="Chats" ref={chatsRef}>
			{showMessageSubmenu && (
				<MessageSubmenu show={showMessageSubmenu} props={submenuProps} />
			)}

			{messagesIterator()}
		</div>
	);
}

export default Chats;
