import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { turnOn, turnOff } from "./appSelectorSlice";
import "./appSelector.css";

export default function AppSelector() {
	let apps = Object.keys(useSelector((state) => state.appSelector));
	const dispatch = useDispatch();
	return (
		<nav id="nav">
			{apps.map((appName) => {
				return (
					<button
						key={appName + "-btn"}
						className="select-app-btn"
						onClick={() => {
							dispatch(turnOn(appName));
						}}
					>
						{appName}
					</button>
				);
			})}
		</nav>
	);
}
