import AppSelector from "./features/appSelector/appSelector";
import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import DrumMachine from "./features/drumMachine/drumMachine.js";
import Calculator from "./features/calculator/calculator.js";
import TwentyFiveClock from "./features/twentyFiveClock/twentyFiveClock.js";
import "./App.css";

function App() {
	return (
		<main id="App">
			<AppSelector />
			<Calculator />
			<MarkdownPreviewer />
			<RandomQuoteMachine />
			<DrumMachine />
			<TwentyFiveClock />
		</main>
	);
}

export default App;
