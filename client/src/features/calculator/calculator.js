import { useDispatch, useSelector } from "react-redux";
import CalcControls from "./calcControls";
import CalcNumpad from "./calcNumpad";
import CalcAdditionalOperators from "./moreOperators";
import "./calculator.scss";
import { useEffect } from "react";
import { clear } from "./calculatorSlice";

const Calculator = () => {
	const { display, output } = useSelector((state) => state.calculator);

	const dispatch = useDispatch();

	useEffect(() => {
		if (display) {
			return;
		} else dispatch(clear());
	}, [display]);

	return display ? (
		<section id="calculator-container">
			<div id="calculator">
				<div id="display">{output}</div>
				<div id="kabashi-logo">KABASHI INSTRUMENTS</div>
				<div id="buttons">
					<CalcAdditionalOperators />
					<CalcNumpad />
					<CalcControls />
				</div>
			</div>
		</section>
	) : null;
};

export default Calculator;
