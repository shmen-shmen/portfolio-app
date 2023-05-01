import RandomQuoteMachine from "./features/randomQuoteMachine/randomQuoteMachine.js";
import AppSelector from "./containers/appSelector.js";
import "./App.css";

function App() {
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
