const CalcNumpad = ({ numbers, handleOperands }) => {
	return (
		<div id="numpad">
			{Object.keys(numbers).map((num) => {
				const name = numbers[num];
				return (
					<button
						id={num}
						key={num + "-key"}
						className={`calc-btn ${
							name == "AC" ? "calc-operator-btn" : "calc-num-btn"
						} `}
						onClick={handleOperands}
					>
						{name}
					</button>
				);
			})}
		</div>
	);
};

export default CalcNumpad;
