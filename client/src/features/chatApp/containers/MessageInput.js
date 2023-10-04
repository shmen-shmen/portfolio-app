import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { typingChatMessage, submitChatMessage } from "../chatSlice";

function MessageInput() {
	const { typing, activeUserId } = useSelector((state) => state.chat);
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		dispatch(typingChatMessage(e.target.value));
	};

	const handleMessageSubmit = (e) => {
		e.preventDefault();
		dispatch(submitChatMessage({ newMsgText: typing, id: activeUserId }));
	};

	return (
		<form className="Message" onSubmit={handleMessageSubmit}>
			<input
				type="text"
				className="Message__input"
				value={typing}
				placeholder="say something cunt"
				onChange={handleInputChange}
			/>
		</form>
	);
}

export default MessageInput;
