import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
// import FmSynth from "./features/fmSynth/fmSynth.js";
import FmSynthTwo from "./features/fmSynth/fmSynthTwo.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
	return (
		<div className="App">
			<AppSelector />
			<main>
				<MarkdownPreviewer />
				<RandomQuoteMachine />
				<FmSynthTwo />
			</main>
		</div>
	);
}

export default App;
