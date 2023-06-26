import { useSelector, useDispatch } from "react-redux";
import { typingNumbers, clear } from "./calculatorSlice";

const CalcNumpad = () => {
	const dispatch = useDispatch();

	const handleNumbers = (e) => {
		const payload = e.target.innerText;
		if (payload == "AC") {
			dispatch(clear());
		} else dispatch(typingNumbers(payload));
	};

	const { numbers } = useSelector((state) => state.calculator);

	return (
		<div id="numpad">
			{Object.keys(numbers).map((num) => {
				const name = numbers[num];
				return (
					<button
						id={num}
						key={num + "-key"}
						className={`calc-btn  ${
							name == "AC" ? "calc-operator-btn" : "calc-num-btn"
						} `}
						onClick={(e) => {
							handleNumbers(e);
						}}
					>
						<span>{name}</span>
					</button>
				);
			})}
		</div>
	);
};

export default CalcNumpad;
