import React from "react";
import "./ChatSidebar.scss";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import { NavLink } from "react-router-dom";

function ChatSidebar() {
	const { contacts, activeContactId } = useSelector((state) => state.chat);

	const contactsIterator = () => {
		const contactsArr = Object.values(contacts);
		return contactsArr.map((contact) => {
			return (
				<Contact
					contact={contact}
					activeContactId={activeContactId}
					key={contact.user_id}
				></Contact>
			);
		});
	};

	return (
		<aside className="Sidebar">
			<nav>
				<NavLink
					to={"/"}
					id="chat-exit-btn"
					className="weather-here-nav-btn navlink"
				>
					{"<<<<<LEAVE"}
				</NavLink>
			</nav>
			{contactsIterator()}
		</aside>
	);
}

export default ChatSidebar;
