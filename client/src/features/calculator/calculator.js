import { useSelector } from "react-redux";
import CalcControls from "./calcControls";
import CalcNumpad from "./calcNumpad";
import CalcAdditionalOperators from "./moreOperators";
import "./calculator.scss";

const Calculator = () => {
	const { output } = useSelector((state) => state.calculator);

	return (
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
	);
};

export default Calculator;
