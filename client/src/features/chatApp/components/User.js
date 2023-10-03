import React from "react";

function User({ user }) {
	const { name, email, profile_pic, status, user_id } = user;
	return (
		<div className="User">
			<img src={profile_pic} alt={name} className="User__pic" />
			<div className="User__details">
				<p className="User__details-name">{name}</p>
				<p className="User__details-status">{status}</p>
			</div>
		</div>
	);
}

export default User;
