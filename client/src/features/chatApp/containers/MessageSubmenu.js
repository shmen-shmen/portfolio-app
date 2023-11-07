import { useDispatch, useSelector } from "react-redux";
import {
	editChatMessage,
	removeChatMessage,
	toggleMessageSubmenu,
} from "../chatSlice";

export const MessageSubmenu = () => {
	const dispatch = useDispatch();
	const { showMessageSubmenu } = useSelector((state) => state.chat);
	const { position, type, is_user_msg, contents, number } = showMessageSubmenu;

	const centering = () => {
		let [x, y] = position;
		const rect = document.querySelector(".Chats").getBoundingClientRect();
		const horizontal = rect.left + (rect.right - rect.left) / 2;
		const vertical = window.innerHeight / 2;

		let translateX = 0;
		if (x >= horizontal) {
			translateX = "-100%";
			x -= 5;
		} else {
			x += 5;
		}
		let translateY = 0;
		if (y >= vertical) {
			translateY = "-100%";
			y -= 5;
		} else {
			y += 5;
		}

		return {
			left: x,
			top: y,
			transform: `translate(${translateX}, ${translateY})`,
		};
	};

	const handleEditClick = (contents, number) => {
		dispatch(editChatMessage({ contents, number }));
		dispatch(toggleMessageSubmenu(false));
	};
	const handleDeleteClick = (number) => {
		dispatch(removeChatMessage(number));
		dispatch(toggleMessageSubmenu(false));
	};

	return (
		<div className="message-submenu" style={centering()}>
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
	);
};
