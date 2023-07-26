import React from "react";
import { useSelector } from "react-redux";
import "./appSelector.scss";
import { NavLink } from "react-router-dom";

const AppSelector = () => {
	const state = useSelector((state) => state);

	// Dynamically import reducers
	const featureContext = require.context(
		"../../features",
		true,
		/.*\/[a-zA-Z0-9]+Slice\.js$/ // Assuming the reducers are named as "<featureName>Slice.js"
	);

	// Generate feature objects dynamically based on imported reducers
	const features = {};
	featureContext.keys().map((key) => {
		const featureName = key.match(/\/([a-zA-Z0-9]+)Slice\.js$/)[1];
		const featureAdress = key.match(/\.\/([^/]+)\/[^/]+\.js$/)[1];
		const name = state[featureName]["displayName"];
		features[name] = {
			featureAdress: featureAdress,
		};
	});

	return (
		<div id="nav-wrapper">
			<nav id="nav">
				{Object.keys(features).map((featureName) => {
					if (featureName !== "appSelector")
						return (
							<NavLink
								to={features[featureName]["featureAdress"]}
								id={featureName + "-id"}
								key={featureName + "-key"}
								className="nav-button nav"
							>
								{featureName}
							</NavLink>
						);
				})}
			</nav>
		</div>
	);
};

export default AppSelector;
