import { useSelector, useDispatch } from "react-redux";
import {
	hide_calculator,
	typingOperands,
	typingOperators,
	clear,
	equals,
} from "./calculatorSlice";
import "./calculator.scss";
import { useEffect } from "react";

const Calculator = () => {
	const { display, numbers, controls, output } = useSelector(
		(state) => state.calculator
	);
	const dispatch = useDispatch();

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

	// useEffect(() => {
	// 	console.log(output);
	// 	// console.log(output.join(""));
	// }, [output]);

	return display ? (
		<section id="calculator-container">
			<div id="calculator">
				<button className="calc-close-btn" onClick={handleCalcExit}>
					X
				</button>
				<div id="display">{output}</div>
				<div id="buttons">
					<div id="numpad">
						{Object.keys(numbers).map((num) => {
							return (
								<button
									id={num}
									key={num + "-key"}
									className="calc-control-btn"
									onClick={handleOperands}
								>
									{numbers[num]}
								</button>
							);
						})}
					</div>
					<div id="controls">
						{Object.keys(controls).map((control) => {
							const { name, func } = controls[control];
							return (
								<button
									id={control}
									key={control + "-key"}
									className="calc-control-btn"
									onClick={handleOperators}
								>
									{name}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	) : null;
};

export default Calculator;
