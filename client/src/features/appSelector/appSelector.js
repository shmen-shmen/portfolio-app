import React from "react";
import "./appSelector.scss";
import { NavLink } from "react-router-dom";

const AppSelector = () => {
	return (
		<div id="nav-wrapper">
			<nav id="nav">
				<a
					href="https://shmen-shmen.github.io/kabashi-sonic-10000/"
					target="_blank"
					id={"sythesizer-id"}
					key={"sythesizer-key"}
					className="nav-button nav"
				>
					Sythesizer
				</a>
				<NavLink
					to={"/chatApp"}
					id={"chatApp-id"}
					key={"chatApp-key"}
					className="nav-button nav"
				>
					Chat App
				</NavLink>
				<NavLink
					to={"/weatherHere"}
					id={"weatherHere-id"}
					key={"weatherHere-key"}
					className="nav-button nav"
				>
					The Weather Here
				</NavLink>
				<NavLink
					to={"/twentyFiveClock"}
					id={"twentyFiveClock-id"}
					key={"twentyFiveClock-key"}
					className="nav-button nav"
				>
					25+5 clock
				</NavLink>
				<NavLink
					to={"/randomQuoteMachine"}
					id={"randomQuoteMachine-id"}
					key={"randomQuoteMachine-key"}
					className="nav-button nav"
				>
					random quote machine
				</NavLink>
				<NavLink
					to={"/calculator"}
					id={"calculator-id"}
					key={"calculator-key"}
					className="nav-button nav"
				>
					calculator
				</NavLink>
				<NavLink
					to={"/drumMachine"}
					id={"drumMachine-id"}
					key={"drumMachine-key"}
					className="nav-button nav"
				>
					farm machine
				</NavLink>
				<NavLink
					to={"/markdownPreviewer"}
					id={"markdownPreviewer-id"}
					key={"markdownPreviewer-key"}
					className="nav-button nav"
				>
					markdown previewer
				</NavLink>
			</nav>
		</div>
	);
};

export default AppSelector;
