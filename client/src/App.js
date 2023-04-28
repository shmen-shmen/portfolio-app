import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
	// const [data, setData] = useState(null);
	// useEffect(() => {
	// 	fetch("/api")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);

	// console.log(data);

	const dispatch = useDispatch();

	return (
		<div className="App">
			<AppSelector />
			<main>
				<RandomQuoteMachine />
			</main>
		</div>
	);
}

export default App;
