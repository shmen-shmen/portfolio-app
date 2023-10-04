import React from "react";
import { useDispatch } from "react-redux";
import { setActiveUserId } from "../chatSlice";

function User({ user }) {
	const { name, email, profile_pic, status, user_id } = user;
	const dispatch = useDispatch();

	const handleUserClick = () => {
		dispatch(setActiveUserId(user_id));
	};

	return (
		<div className="User" onClick={handleUserClick}>
			<img src={profile_pic} alt={name} className="User__pic" />
			<div className="User__details">
				<p className="User__details-name">{name}</p>
				<p className="User__details-status">{status}</p>
			</div>
		</div>
	);
}

export default User;
