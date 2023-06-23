const CalcAdditionalOperators = ({ operators }) => {
	return (
		<div className="top-button-row">
			{Object.keys(operators).map((control) => {
				return (
					<button
						id={control}
						key={control + "-key"}
						className="calc-btn calc-secondary-operator-btn"
					>
						{operators[control]}
					</button>
				);
			})}
		</div>
	);
};

export default CalcAdditionalOperators;
