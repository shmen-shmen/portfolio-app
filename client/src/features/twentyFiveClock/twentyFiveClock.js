import { useDispatch, useSelector } from "react-redux";
import { intervalControl, intervalReset } from "./twentyFiveClockSlice";
import "./twentyFiveClock.scss";

const TwentyFiveClock = () => {
	const { display, displayName, sessionLength, breakLength } = useSelector(
		(state) => state.twentyFiveClock
	);

	const dispatch = useDispatch();

	const intervalControlHandler = (e) => {
		const [interval, operation] = e.target.id.split("-");
		dispatch(intervalControl({ interval, operation }));
	};

	const resetHandler = () => {
		dispatch(intervalReset());
	};

	return display ? (
		<section id="twentyFiveClock-container">
			<div id="twentyFiveClock">
				<h1 id="twentyFiveClock-label">{displayName}</h1>
				<div id="timer" className="clock-control">
					<div id="timer-label" className="clock-control-label">
						Session:
					</div>
					<button id="start_stop">start</button>
					<div id="time-left">{sessionLength}</div>
					<button id="reset" onClick={resetHandler}>
						reset
					</button>
				</div>
				<div id="break-control" className="clock-control">
					<div id="break-label" className="clock-control-label">
						Break Length:
					</div>
					<button id="break-increment" onClick={intervalControlHandler}>
						↑
					</button>
					<div id="break-length">{breakLength}</div>
					<button id="break-decrement" onClick={intervalControlHandler}>
						↓
					</button>
				</div>
				<div id="session-control" className="clock-control">
					<div id="session-label" className="clock-control-label">
						Session Length:
					</div>
					<button id="session-increment" onClick={intervalControlHandler}>
						↑
					</button>
					<div id="session-length">{sessionLength}</div>
					<button id="session-decrement" onClick={intervalControlHandler}>
						↓
					</button>
				</div>
			</div>
		</section>
	) : null;
};

export default TwentyFiveClock;
