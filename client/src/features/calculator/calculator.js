import { useSelector, useDispatch } from "react-redux";
import { hide_calculator, clear_calculator } from "./calculatorSlice";
import "./calculator.scss";

const Calculator = () => {
	const { display, numbers, controls, output } = useSelector(
		(state) => state.calculator
	);
	const dispatch = useDispatch();

	const handleCalcExit = () => {
		dispatch(hide_calculator());
	};

	const handleControlPress = (e) => {
		const { id } = e.target;
		switch (id) {
			case "AC":
				dispatch(clear_calculator());
				break;

			default:
				break;
		}
	};

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
								>
									{numbers[num]}
								</button>
							);
						})}
					</div>
					<div id="controls">
						{Object.keys(controls).map((control) => {
							return (
								<button
									id={control}
									key={control + "-key"}
									className="calc-control-btn"
									onClick={handleControlPress}
								>
									<span>{controls[control]}</span>
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
