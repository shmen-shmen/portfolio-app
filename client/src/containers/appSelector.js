import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	showQuotes,
	hideQuotes,
} from "../features/randomQuoteMachine/randomQuoteSlice";
import {
	showMarkdown,
	hideMarkdown,
} from "../features/markdownPreviewer/markdownPreviewerSlice";
import { showSynth, hideSynth } from "../features/fmSynth/fmSynthSlice";
import "./appSelector.css";

const AppSelector = () => {
	const state = useSelector((state) => state);
	const dispatch = useDispatch();

	// Dynamically import reducers
	const featureContext = require.context(
		"../features",
		true,
		/.*\/[a-zA-Z0-9]+Slice\.js$/ // Assuming the reducers are named as "<featureName>Slice.js"
	);

	// Generate feature objects dynamically based on imported reducers
	const features = featureContext.keys().map((key) => {
		const featureName = key.match(/\/([a-zA-Z0-9]+)Slice\.js$/)[1];

		const featureSlice = featureContext(key);
		return {
			name: state[featureName]["displayName"],
			showFunction: featureSlice[`show_${featureName}`],
			hideFunction: featureSlice[`hide_${featureName}`],
		};
	});

	const toggleFeature = (showFunction) => {
		dispatch(showFunction());
	};

	return (
		<nav id="nav">
			{features.map((feature) => {
				return (
					<button
						id={feature["name"]}
						className="nav nav-button"
						onClick={() => {
							toggleFeature(feature["showFunction"]);
						}}
					>
						{feature["name"]}
					</button>
				);
			})}
		</nav>
	);
};

export default AppSelector;
