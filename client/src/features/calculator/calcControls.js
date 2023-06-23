const CalcControls = ({ controls, handleOperators }) => {
	return (
		<div id="controls">
			{Object.keys(controls).map((control) => {
				return (
					<button
						id={control}
						key={control + "-key"}
						className="calc-control-btn"
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
