import AppSelector from "./features/appSelector/appSelector";
import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import DrumMachine from "./features/drumMachine/drumMachine.js";
import Calculator from "./features/calculator/calculator.js";
import TwentyFiveClock from "./features/twentyFiveClock/twentyFiveClock.js";
import "./App.css";
import TheWeatherHere from "./features/weatherHere/theWeatherHere";
import Chat from "./features/chatApp/components/Chat";
import { Routes, Route } from "react-router-dom";

function App() {
	return (
		<main id="App">
			<Routes>
				<Route exact path="/" element={<AppSelector />}></Route>

				<Route exact path="/chatApp" element={<Chat />}></Route>

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
