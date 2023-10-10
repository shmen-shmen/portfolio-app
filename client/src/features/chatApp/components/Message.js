import React from "react";
import VoiceWrapper from "../containers/VoiceWrapper";

function Message({ message }) {
	const { is_user_msg, payload, type, number } = message;

	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
			{type == "voice" ? (
				<VoiceWrapper
					src={payload}
					draft={false}
					number={number}
				></VoiceWrapper>
			) : (
				<span>{payload}</span>
			)}
		</div>
	);
}

export default Message;
