import React from "react";

const Empty = ({ user }) => {
	const { name, profile_pic } = user;
	const first_name = name.split(" ")[0];

	return (
		<div className="Empty">
			<div className="Empty_greeting_wrapper">
				<img src={profile_pic} alt={name} className="Empty__img" />
				<h2 className="Empty__name">Welcome, {first_name}!</h2>
				<span className="Empty__info"> (now go chat to someone)</span>
			</div>
		</div>
	);
};

export default Empty;
