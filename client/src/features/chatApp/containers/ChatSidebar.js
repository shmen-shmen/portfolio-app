import React from "react";
import _ from "lodash";
import "../chat.scss";
import { useSelector } from "react-redux";
import User from "../components/User";

function ChatSidebar() {
	const { contacts } = useSelector((state) => state.chat);
	const contactsIterator = () => {
		const contactsArr = _.values(contacts);
		return contactsArr.map((contact) => {
			return <User user={contact} key={contact.user_id}></User>;
		});
	};

	return <aside className="Sidebar">{contactsIterator()}</aside>;
}

export default ChatSidebar;
