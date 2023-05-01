import React from "react";
import { useDispatch } from "react-redux";
import { showQuotes } from "../features/randomQuoteMachine/randomQuoteSlice";
import "./appSelector.css";

const AppSelector = () => {
	const dispatch = useDispatch();
	return (
		<nav id="nav">
			<button
				className="nav nav-button"
				onClick={() => {
					console.log("NAV BUTTON WAS PRESSED");
					dispatch(showQuotes());
				}}
			>
				quotes
			</button>
			{/* <p>◎●◦⦿❀⚈⚉⚆⚇</p> */}
			<p className="nav">◎●◦⦿</p>
			<button
				className="nav nav-button inactive-button "
				onClick={() => {
					console.log("NAV BUTTON WAS PRESSED");
				}}
			>
				drums
			</button>
			<p className="nav">⚈⚉⚆⚇</p>
			<button
				className="nav nav-button inactive-button"
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
