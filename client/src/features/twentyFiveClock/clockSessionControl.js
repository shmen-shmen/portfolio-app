import { useSelector } from "react-redux";

const ClockSessionControl = ({ intervalControlHandler, timeConverter }) => {
	const { sessionLength } = useSelector((state) => state.twentyFiveClock);

	return (
		<div id="session-control" className="clock-control">
			<div id="session-label" className="clock-control-label">
				<span>Session Length:</span>
				<span id="session-length" className="clock-numbers">
					{timeConverter(sessionLength, false)}
				</span>
			</div>
			<button
				id="session-increment"
				className="clock-btn"
				onClick={intervalControlHandler}
			>
				↑
			</button>
			<button
				id="session-decrement"
				className="clock-btn"
				onClick={intervalControlHandler}
			>
				↓
			</button>
		</div>
	);
};

export default ClockSessionControl;
