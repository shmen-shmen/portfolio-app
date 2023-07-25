import { useSelector, useDispatch } from "react-redux";
import { hide_calculator, squareRoot, percent } from "./calculatorSlice";
import { show_appSelector } from "../appSelector/appSelectorSlice";
import { NavLink } from "react-router-dom";

const CalcAdditionalOperators = () => {
	const dispatch = useDispatch();

	const { additionalOperators } = useSelector((state) => state.calculator);

	const handleKeyPress = (e) => {
		switch (e.target.id) {
			case "OFF":
				dispatch(hide_calculator());
				dispatch(show_appSelector());
				break;
			case "sqrt":
				dispatch(squareRoot());
				break;
			case "percent":
				dispatch(percent());
				break;
			default:
				break;
		}
	};

	return (
		<div id="top-button-row">
			{Object.keys(additionalOperators).map((control) => {
				if (control == "OFF") {
					return (
						<NavLink
							to={"/"}
							id={control}
							key={control + "-key"}
							className="calc-btn calc-secondary-btn calc-exit-btn"
							onClick={handleKeyPress}
						>
							<span>{additionalOperators[control]}</span>
						</NavLink>
					);
				} else
					return (
						<button
							id={control}
							key={control + "-key"}
							className="calc-btn calc-secondary-btn"
							onClick={handleKeyPress}
						>
							<span>{additionalOperators[control]}</span>
						</button>
					);
			})}
		</div>
	);
};

export default CalcAdditionalOperators;
