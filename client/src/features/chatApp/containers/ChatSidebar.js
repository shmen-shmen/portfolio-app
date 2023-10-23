import React from "react";
import _ from "lodash";
import "../chat.scss";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";

function ChatSidebar() {
	const { contacts } = useSelector((state) => state.chat);

	const contactsIterator = () => {
		const contactsArr = _.values(contacts);
		return contactsArr.map((contact) => {
			return <Contact contact={contact} key={contact.user_id}></Contact>;
		});
	};

	return <aside className="Sidebar">{contactsIterator()}</aside>;
}

export default ChatSidebar;
