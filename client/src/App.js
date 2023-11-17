import AppSelector from "./features/appSelector/appSelector.js";
import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import DrumMachine from "./features/drumMachine/drumMachine.js";
import Calculator from "./features/calculator/calculator.js";
import TwentyFiveClock from "./features/twentyFiveClock/twentyFiveClock.js";
import "./App.css";
import TheWeatherHere from "./features/weatherHere/theWeatherHere.js";
import ChatApp from "./features/chatApp/components/Chat.js";
import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

function App() {
	useEffect(() => {
		function calculateVh() {
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty("--vh", `${vh}px`);
		}
		calculateVh();
		window.addEventListener("resize", calculateVh);
		window.addEventListener("orientationchange", calculateVh);

		return () => {
			window.removeEventListener("resize", calculateVh);
			window.removeEventListener("orientationchange", calculateVh);
		};
	}, []);

	return (
		<main id="App">
			<Routes>
				<Route exact path="/" element={<AppSelector />}></Route>

				<Route exact path="/chatApp" element={<ChatApp />}></Route>

				<Route exact path="/weatherHere" element={<TheWeatherHere />}></Route>

				<Route exact path="/calculator" element={<Calculator />}></Route>

				<Route
					exact
					path="/markdownPreviewer"
					element={<MarkdownPreviewer />}
				></Route>

				<Route
					exact
					path="/randomQuoteMachine"
					element={<RandomQuoteMachine />}
				></Route>

				<Route exact path="/drumMachine" element={<DrumMachine />}></Route>

				<Route
					exact
					path="/twentyFiveClock"
					element={<TwentyFiveClock />}
				></Route>
			</Routes>
		</main>
	);
}

export default App;
