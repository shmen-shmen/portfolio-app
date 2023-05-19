import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import FmSynth from "./features/fmSynth/fmSynth.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
	return (
		<div className="App">
			<AppSelector />
			<main>
				<MarkdownPreviewer />
				<RandomQuoteMachine />
				<FmSynth />
			</main>
		</div>
	);
}

export default App;
