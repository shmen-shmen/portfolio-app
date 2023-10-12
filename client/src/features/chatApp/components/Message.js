import React from "react";
import VoiceWrapper from "../containers/VoiceWrapper";

function Message({ message }) {
	const { is_user_msg, contents, type, number } = message;

	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
			{type == "text" ? (
				<span>{contents}</span>
			) : (
				<VoiceWrapper
					contents={contents}
					draft={false}
					number={number}
					type={type}
				></VoiceWrapper>
			)}
		</div>
	);
}

export default Message;
