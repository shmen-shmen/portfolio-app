import { useDispatch } from "react-redux";
import {
	editChatMessage,
	removeChatMessage,
	toggleMessageSubmenu,
} from "../chatSlice";

export const MessageSubmenu = ({ show, props }) => {
	const { position, type, is_user_msg, contents, number } = props;

	const centering = () => {
		let [x, y] = position;
		const chatsHalfWidth = document.querySelector(".Chats").clientWidth / 2;
		const windowWidth = window.innerWidth;
		const horizontal = windowWidth - chatsHalfWidth;
		const vertical = window.innerHeight / 2;

		let translateX = 0;
		if (x >= horizontal) {
			translateX = "-100%";
			x -= 10;
		} else {
			x += 10;
		}
		let translateY = 0;
		if (y >= vertical) {
			translateY = "-100%";
			y -= 10;
		} else {
			y += 10;
		}

		return {
			left: x,
			top: y,
			transform: `translate(${translateX}, ${translateY})`,
		};
	};

	const dispatch = useDispatch();
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
