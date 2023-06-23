const CalcNumpad = ({ numbers, handleOperands }) => {
	return (
		<div id="numpad">
			{Object.keys(numbers).map((num) => {
				return (
					<button
						id={num}
						key={num + "-key"}
						className="calc-control-btn"
						onClick={handleOperands}
					>
						{numbers[num]}
					</button>
				);
			})}
		</div>
	);
};

export default CalcNumpad;
