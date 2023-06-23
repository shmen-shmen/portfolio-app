import { useSelector, useDispatch } from "react-redux";
import CalcControls from "./calcControls";
import CalcNumpad from "./calcNumpad";
import CalcAdditionalOperators from "./moreOperators";
import {
	hide_calculator,
	typingOperands,
	typingOperators,
	clear,
	equals,
} from "./calculatorSlice";
import "./calculator.scss";

const Calculator = () => {
	const dispatch = useDispatch();

	const { display, numbers, basicOperators, additionalOperators, output } =
		useSelector((state) => state.calculator);

	const handleCalcExit = () => {
		dispatch(hide_calculator());
	};

	const handleOperands = (e) => {
		const payload = e.target.innerText;
		if (payload == "AC") {
			dispatch(clear());
		} else dispatch(typingOperands(payload));
	};

	const handleOperators = (e) => {
		const payload = e.target.innerText;
		if (payload == "=") {
			dispatch(equals());
		} else dispatch(typingOperators(payload));
	};

	return display ? (
		<section id="calculator-container">
			<div id="calculator">
				<button className="calc-close-btn" onClick={handleCalcExit}>
					X
				</button>
				<div id="display">{output}</div>
				<div id="kabashi-logo">KABASHI INSTRUMENTS</div>
				<div id="buttons">
					<CalcAdditionalOperators operators={additionalOperators} />
					<CalcNumpad numbers={numbers} handleOperands={handleOperands} />
					<CalcControls
						controls={basicOperators}
						handleOperators={handleOperators}
					/>
				</div>
			</div>
		</section>
	) : null;
};

export default Calculator;
