import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import DrumMachine from "./features/drumMachine/drumMachine.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
	return (
		<div id="App">
			<AppSelector />
			<main>
				<MarkdownPreviewer />
				<RandomQuoteMachine />
				<DrumMachine />
			</main>
		</div>
	);
}

export default App;
