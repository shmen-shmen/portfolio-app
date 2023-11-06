import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import Message from "../components/Message";
import { setPreviewValue, toggleMessageSubmenu } from "../chatSlice";
import { MessageSubmenu } from "./MessageSubmenu";
import "./Chats.scss";

function Chats({ activeContactId }) {
	const messages = useSelector((state) => state.chat.messages[activeContactId]);
	const { showMessageSubmenu } = useSelector((state) => state.chat);
	const { inputHeight } = useSelector((state) => state.chat);
	const editing = useSelector((state) => Boolean(state.chat.editing.number));

	const chatsRef = useRef(null);
	const dispatch = useDispatch();

	useEffect(() => {
		if (chatsRef.current) {
			chatsRef.current.scrollTop = chatsRef.current.scrollHeight;
		}
	}, [inputHeight]);

	useEffect(() => {
		dispatch(setPreviewValue(activeContactId));
	}, [messages]);

	const [submenuProps, setSubmenuProps] = useState(null);

	const handleMessagelick = (e, props) => {
		e.preventDefault();
		if (editing) {
			return;
		}
		if (showMessageSubmenu) {
			dispatch(toggleMessageSubmenu(false));
			setSubmenuProps(null);
		} else {
			dispatch(toggleMessageSubmenu(true));
			if (props.type !== "text") props.contents = "";
			setSubmenuProps({
				...props,
				// there's a bug when resize sometimes position is undefined
				position: [e.clientX, e.clientY],
			});
		}
	};

	useEffect(() => {
		const callback = () => {
			if (showMessageSubmenu) {
				dispatch(toggleMessageSubmenu(false));
			}
		};
		window.addEventListener("click", callback);
		window.addEventListener("resize", callback);
		return () => {
			window.removeEventListener("click", callback);
			window.removeEventListener("resize", callback);
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
			{showMessageSubmenu && (
				<MessageSubmenu show={showMessageSubmenu} props={submenuProps} />
			)}

			{messagesIterator()}
		</div>
	);
}

export default Chats;
