import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Message from "../components/Message";
import { setPreviewValue, toggleMessageSubmenu } from "../chatSlice";
import { MessageSubmenu } from "./MessageSubmenu";
import "./Chats.scss";

function Chats({ activeContactId }) {
	const dispatch = useDispatch();
	const messages = useSelector((state) => state.chat.messages[activeContactId]);
	useEffect(() => {
		dispatch(setPreviewValue(activeContactId));
	}, [messages]);

	const { inputHeight } = useSelector((state) => state.chat);
	const chatsRef = useRef(null);
	useEffect(() => {
		if (chatsRef.current) {
			chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
		}
	}, [inputHeight]);

	const showMessageSubmenu = useSelector((state) =>
		Boolean(state.chat.showMessageSubmenu)
	);
	const editing = useSelector((state) => Boolean(state.chat.editing.number));

	const handleMessagelick = (e, props) => {
		e.preventDefault();
		if (editing) {
			return;
		}
		if (showMessageSubmenu) {
			dispatch(toggleMessageSubmenu(false));
		} else {
			if (props.type !== "text") props.contents = "";
			dispatch(
				toggleMessageSubmenu({
					...props,
					// there's a bug when resize sometimes position is undefined
					position: [e.clientX || 0, e.clientY || 0],
				})
			);
		}
	};
	useEffect(() => {
		const callback = () => {
			if (showMessageSubmenu) {
				dispatch(toggleMessageSubmenu(false));
			}
		};
		window.addEventListener("click", callback);
		return () => {
			window.removeEventListener("click", callback);
		};
	}, [showMessageSubmenu]);

	const messagesIterator = () => {
		const messagesArr = _.values(messages);
		return messagesArr.map((message, index) => {
			return (
				<Message
					topMessage={index === 0}
					message={message}
					key={`${message.number}-${activeContactId}`}
					handleMessagelick={handleMessagelick}
				></Message>
			);
		});
	};

	return (
		<div className="Chats" ref={chatsRef}>
			{showMessageSubmenu && <MessageSubmenu />}
			{messagesIterator()}
		</div>
	);
}

export default Chats;
