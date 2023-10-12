import React from "react";
import VoiceWrapper from "../containers/VoiceWrapper";

function Message({ message }) {
	const { is_user_msg, contents, type, number } = message;

	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
			{type == "voice" ? (
				<VoiceWrapper
					voice={contents}
					draft={false}
					number={number}
				></VoiceWrapper>
			) : (
				<span>{contents}</span>
			)}
		</div>
	);
}

export default Message;
