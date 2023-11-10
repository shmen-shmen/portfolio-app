import React from "react";
import MediaWrapper from "../containers/MediaWrapper";

function Message({ topMessage, message, handleMessagelick }) {
	const { is_user_msg, contents, type, number, edited, time } = message;

	const timeString = () => {
		const utcDate = new Date(time);

		const hours = utcDate.getHours();
		const minutes = utcDate.getMinutes();

		const formattedHours = hours < 10 ? "0" + hours : hours;
		const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

		return `${formattedHours}:${formattedMinutes}`;
	};

	return (
		<div
			className={`Chat-wrapper ${
				is_user_msg ? "is_user_msg" : ""
			} type-${type}`}
			style={{ marginTop: `${topMessage ? "auto" : 0}` }}
			onContextMenu={(e) =>
				handleMessagelick(e, {
					type: type,
					is_user_msg: is_user_msg,
					contents: contents,
					number: number,
				})
			}
		>
			<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
				{type === "text" ? (
					<>
						<span>{contents}</span>
					</>
				) : (
					<MediaWrapper
						contents={contents}
						draft={false}
						number={number}
						type={type}
					></MediaWrapper>
				)}
				<span className="message-flag">{`${
					edited ? "(edited)" : ""
				} ${timeString()}`}</span>
			</div>
		</div>
	);
}

export default Message;
