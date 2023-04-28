import React from "react";
import { useDispatch } from "react-redux";
import { showQuotes } from "../features/randomQuoteMachine/randomQuoteSlice";
import "./appSelector.css";

const AppSelector = () => {
	const dispatch = useDispatch();
	return (
		<nav id="nav">
			<button
				className="nav-button"
				onClick={() => {
					console.log("NAV BUTTON WAS PRESSED");
					dispatch(showQuotes());
				}}
			>
				quotes
			</button>
			<button
				className="inactive-button nav-button"
				onClick={() => {
					console.log("NAV BUTTON WAS PRESSED");
				}}
			>
				drums
			</button>
			<button
				className="inactive-button nav-button"
				onClick={() => {
					console.log("NAV BUTTON WAS PRESSED");
				}}
			>
				tatari
			</button>
		</nav>
	);
};

export default AppSelector;
