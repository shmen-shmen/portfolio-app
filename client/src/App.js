import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import MarkdownPreviewer from "./features/markdownPreviewer/markdownPreviewer.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
	return (
		<div className="App">
			<AppSelector />
			<main>
				<MarkdownPreviewer />
				<RandomQuoteMachine />
			</main>
		</div>
	);
}

export default App;
