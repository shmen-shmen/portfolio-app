const CalcControls = ({ controls, handleOperators }) => {
	return (
		<div className="right-button-column">
			{Object.keys(controls).map((control) => {
				return (
					<button
						id={control}
						key={control + "-key"}
						className="calc-btn calc-operator-btn"
						onClick={handleOperators}
					>
						{controls[control]}
					</button>
				);
			})}
		</div>
	);
};

export default CalcControls;
