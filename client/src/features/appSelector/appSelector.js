import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./appSelector.scss";

const AppSelector = () => {
	const state = useSelector((state) => state);

	const { display } = useSelector((state) => state.appSelector);

	const dispatch = useDispatch();

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

		const featureSlice = featureContext(key);
		const name = state[featureName]["displayName"];
		features[name] = {
			display: state[featureName]["display"],
			showFunction: featureSlice[`show_${featureName}`],
			hideFunction: featureSlice[`hide_${featureName}`],
		};
	});

	const toggleFeature = (featureName) => {
		Object.keys(features).map((feature) => {
			if (feature == featureName) {
				if (features[feature].display) {
					dispatch(features[feature].hideFunction());
				} else dispatch(features[feature].showFunction());
			} else dispatch(features[feature].hideFunction());
		});
	};

	return display ? (
		<div id="nav-wrapper">
			<nav id="nav">
				{Object.keys(features).map((featureName) => {
					if (featureName !== "appSelector")
						return (
							<button
								id={featureName + "-id"}
								key={featureName + "-key"}
								className="nav-button nav"
								onClick={() => {
									console.log("penis");
									toggleFeature(featureName);
								}}
							>
								{featureName}
							</button>
						);
				})}
			</nav>
		</div>
	) : null;
};

export default AppSelector;
