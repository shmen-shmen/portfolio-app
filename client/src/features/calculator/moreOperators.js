import { useSelector, useDispatch } from "react-redux";
import { hide_calculator } from "./calculatorSlice";

const CalcAdditionalOperators = () => {
	const dispatch = useDispatch();

	const { additionalOperators } = useSelector((state) => state.calculator);

	const handleCalcExit = () => {
		dispatch(hide_calculator());
	};
	return (
		<div id="top-button-row">
			{Object.keys(additionalOperators).map((control) => {
				return (
					<button
						id={control}
						key={control + "-key"}
						className="calc-btn calc-secondary-btn"
						onClick={control == "OFF" ? handleCalcExit : null}
					>
						<span>{additionalOperators[control]}</span>
					</button>
				);
			})}
		</div>
	);
};

export default CalcAdditionalOperators;
