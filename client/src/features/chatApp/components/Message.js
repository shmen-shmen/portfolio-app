import React from "react";
import MediaWrapper from "../containers/MediaWrapper";

function Message({ message }) {
	const { is_user_msg, contents, type, number } = message;

	return (
		<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
			{type == "text" ? (
				<span>{contents}</span>
			) : (
				<MediaWrapper
					contents={contents}
					draft={false}
					number={number}
					type={type}
				></MediaWrapper>
			)}
		</div>
	);
}

export default Message;
