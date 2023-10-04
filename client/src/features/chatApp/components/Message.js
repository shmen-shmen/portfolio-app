import React from "react";

function Message({ message }) {
	const { is_user_msg, text } = message;
	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""}`}>{text}</div>
	);
}

export default Message;
