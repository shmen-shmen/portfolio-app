import { useSelector } from "react-redux";

const ClockBreakControl = ({ intervalControlHandler, timeConverter }) => {
	const { breakLength } = useSelector((state) => state.twentyFiveClock);

	return (
		<div id="break-control" className="clock-control">
			<div id="break-label" className="clock-control-label">
				<span>Break Length:</span>
				<span id="break-length" className="clock-numbers">
					{timeConverter(breakLength, false)}
				</span>
			</div>
			<button
				id="break-increment"
				className="clock-btn"
				onClick={intervalControlHandler}
			>
				↑
			</button>

			<button
				id="break-decrement"
				className="clock-btn"
				onClick={intervalControlHandler}
			>
				↓
			</button>
		</div>
	);
};

export default ClockBreakControl;
