import React from "react";
import MediaWrapper from "../containers/MediaWrapper";

function Message({ message, handleMessagelick }) {
	const { is_user_msg, contents, type, number, edited } = message;

	return (
		<div
			className={`Chat-wrapper ${
				is_user_msg ? "is_user_msg" : ""
			} type-${type}`}
			onClick={(e) =>
				handleMessagelick(e, {
					type: type,
					is_user_msg: is_user_msg,
					contents: contents,
					number: number,
				})
			}
		>
			<div className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}>
				{type == "text" ? (
					<>
						<span>{contents}</span>
						{edited && <span className="message-edited-flag">(edited)</span>}
					</>
				) : (
					<MediaWrapper
						contents={contents}
						draft={false}
						number={number}
						type={type}
					></MediaWrapper>
				)}
			</div>
			{/* <button
				className="Chat__submenu-btn"
				onClick={(e) =>
					handleMessagelick(e, {
						type: type,
						is_user_msg: is_user_msg,
						contents: contents,
						number: number,
					})
				}
			>
				...
			</button> */}
		</div>
	);
}

export default Message;
