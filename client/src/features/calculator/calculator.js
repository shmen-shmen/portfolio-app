import { useSelector, useDispatch } from "react-redux";
import { hide_calculator, typing, clear, equals } from "./calculatorSlice";
import "./calculator.scss";

const Calculator = () => {
	const { display, numbers, controls, input } = useSelector(
		(state) => state.calculator
	);
	const dispatch = useDispatch();

	const handleCalcExit = () => {
		dispatch(hide_calculator());
	};

	const handleNumberPress = (e) => {
		const amount = e.target.innerText;
		if (amount == "AC") {
			dispatch(clear());
		} else if (amount == "=") {
			dispatch(equals());
		} else dispatch(typing(amount));
	};

	// const handleControlPress = (action, payload) => {
	// 	dispatch({ type: `calculator/${action}`, payload: payload || null });
	// };

	return display ? (
		<section id="calculator-container">
			<div id="calculator">
				<button className="calc-close-btn" onClick={handleCalcExit}>
					X
				</button>
				<div id="display">{input}</div>
				<div id="buttons">
					<div id="numpad">
						{Object.keys(numbers).map((num) => {
							return (
								<button
									id={num}
									key={num + "-key"}
									className="calc-control-btn"
									onClick={handleNumberPress}
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
									onClick={handleNumberPress}
								>
									<span>{name}</span>
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
