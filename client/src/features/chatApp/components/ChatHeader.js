import React from "react";
import { dropActiveDialog } from "../chatSlice";
import { useDispatch } from "react-redux";
import "./ChatHeader.scss";

function ChatHeader({ user }) {
	const { name, profile_pic } = user;
	const dispatch = useDispatch();

	const handleBackToContactsClick = () => {
		dispatch(dropActiveDialog());
	};

	return (
		<header className="ChatHeader">
			<button
				className="ChatHeader__back_btn"
				onClick={handleBackToContactsClick}
			>
				{"<-"}
			</button>
			<div className="ChatHeader__contact">
				<img className="ChatHeader__img" src={profile_pic} alt="" />
				<span className="ChatHeader__span">talking to: </span>
				<h1 className="ChatHeader__name">{name}</h1>
			</div>
		</header>
	);
}

export default ChatHeader;
