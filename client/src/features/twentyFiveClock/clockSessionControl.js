import { useSelector } from "react-redux";

const ClockSessionControl = ({ intervalControlHandler, timeConverter }) => {
	const { sessionLength } = useSelector((state) => state.twentyFiveClock);

	return (
		<div id="session-control" className="clock-control">
			<div id="session-label" className="clock-control-label">
				Session Length
			</div>
			<button
				id="session-increment"
				className="clock-btn"
				onClick={intervalControlHandler}
			>
				↑
			</button>
			<div id="session-length" className="clock-numbers">
				{timeConverter(sessionLength, false)}
			</div>
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
