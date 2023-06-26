import { useSelector, useDispatch } from "react-redux";
import { typingOperators, equals } from "./calculatorSlice";

const CalcControls = () => {
	const dispatch = useDispatch();

	const { basicOperators } = useSelector((state) => state.calculator);

	const handleOperators = (e) => {
		const payload = e.target.innerText;
		if (payload == "=") {
			dispatch(equals());
		} else dispatch(typingOperators(payload));
	};

	return (
		<div className="right-button-column">
			{Object.keys(basicOperators).map((control) => {
				return (
					<button
						id={control}
						key={control + "-key"}
						className="calc-btn calc-operator-btn"
						onClick={handleOperators}
					>
						<span>{basicOperators[control]}</span>
					</button>
				);
			})}
		</div>
	);
};

export default CalcControls;
