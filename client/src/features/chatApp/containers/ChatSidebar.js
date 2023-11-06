import React from "react";
import _ from "lodash";
import "./ChatSidebar.scss";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function ChatSidebar() {
	const { contacts, activeContactId } = useSelector((state) => state.chat);

	const contactsIterator = () => {
		const contactsArr = _.values(contacts);
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

	return <aside className="Sidebar">{contactsIterator()}</aside>;
}

export default ChatSidebar;
