import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import RandomQuoteMachine from "./containers/random-quote-machine";
import AppSelector from "./features/selector/appSelector";
import "./App.css";

function App() {
	// const [data, setData] = useState(null);
	// useEffect(() => {
	// 	fetch("/api")
	// 		.then((res) => res.json())
	// 		.then((data) => setData(data.message));
	// }, []);

	let apps = Object.keys(useSelector((state) => state.appSelector));
	const dispatch = useDispatch();

	return (
		<div className="App">
			<RandomQuoteMachine />
			<main>
				<AppSelector />
			</main>
		</div>
	);
}

export default App;
