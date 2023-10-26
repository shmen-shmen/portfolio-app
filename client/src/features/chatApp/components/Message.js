import React, { useState } from "react";
import MediaWrapper from "../containers/MediaWrapper";
import { editChatMessage, removeChatMessage } from "../chatSlice";
import { useDispatch } from "react-redux";

function Message({ message }) {
	const { is_user_msg, contents, type, number, edited } = message;
	const dispatch = useDispatch();

	const [showSubmenu, setShowSubmenu] = useState(false);
	const handleMessagelick = () => {
		setShowSubmenu(!showSubmenu);
	};
	const handleEditClick = (contents, number) => {
		dispatch(editChatMessage({ contents, number }));
	};
	const handleDeleteClick = (number) => {
		console.log("delete click");
		dispatch(removeChatMessage(number));
	};

	return (
		<div
			className={`Chat ${is_user_msg ? "is_user_msg" : ""} type-${type}`}
			onClick={handleMessagelick}
		>
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
			<div className={`message-submenu${showSubmenu ? "" : "-hide"}`}>
				{type == "text" && is_user_msg && (
					<button
						className="edit-remove-msg-btn"
						onClick={() => {
							handleEditClick(contents, number);
						}}
					>
						edit
					</button>
				)}
				<button
					className="edit-remove-msg-btn"
					onClick={() => {
						handleDeleteClick(number);
					}}
				>
					delete
				</button>
			</div>
		</div>
	);
}

export default Message;
