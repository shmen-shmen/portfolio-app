import React from "react";

function Message({ message }) {
	const { is_user_msg, payload, type } = message;

	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
			{type == "voice" ? (
				<audio src={payload} controls></audio>
			) : (
				<span>{payload}</span>
			)}
		</div>
	);
}

export default Message;
