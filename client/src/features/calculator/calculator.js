import { useSelector, useDispatch } from "react-redux";
import { hide_calculator } from "./calculatorSlice";
import "./calculator.scss";

const Calculator = () => {
	const { display, numbers, controls } = useSelector(
		(state) => state.calculator
	);
	const dispatch = useDispatch();

	const handleCalcExit = () => {
		dispatch(hide_calculator());
	};

	return display ? (
		<section id="calculator-container">
			<div id="calculator">
				<button className="calc-close-btn" onClick={handleCalcExit}>
					X
				</button>
				<div id="display">66666666</div>
				<div id="buttons">
					<div id="numpad">
						{Object.keys(numbers).map((num) => {
							console.log(num);
							return (
								<button id={num} className="calc-control-btn">
									{numbers[num]}
								</button>
							);
						})}
					</div>
					<div id="controls">
						{Object.keys(controls).map((control) => {
							return (
								<button id={control} className="calc-control-btn">
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
