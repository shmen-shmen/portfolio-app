import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setActiveContactId, setPreviewValue } from "../chatSlice";

function Contact({ contact, activeContactId }) {
	const { name, profile_pic, previewValue, user_id } = contact;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(setPreviewValue(user_id));
	});

	const handleContactClick = () => {
		dispatch(setActiveContactId(user_id));
	};

	function truncateText(text) {
		let shortText = text.substring(0, 35);
		if (shortText.slice(-1) === " ") {
			shortText = shortText.slice(0, -1);
		}
		if (shortText.length >= 34) {
			shortText += "...";
		}
		return shortText;
	}

	const active = user_id === activeContactId;

	return (
		<div
			className={`Contact ${active ? "active-contact" : ""}`}
			onClick={handleContactClick}
		>
			<img src={profile_pic} alt={name} className="Contact__pic" />
			<div className="Contact__details">
				<p className="Contact__details-name">{name}</p>
				<p className="Contact__details-preview">{truncateText(previewValue)}</p>
			</div>
		</div>
	);
}

export default Contact;
