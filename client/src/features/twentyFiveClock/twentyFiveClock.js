import { useDispatch, useSelector } from "react-redux";
import {
	intervalControl,
	reset,
	start,
	tick,
	stop,
} from "./twentyFiveClockSlice";
import "./twentyFiveClock.scss";
import { useEffect } from "react";

const TwentyFiveClock = () => {
	const {
		display,
		displayName,
		sessionLength,
		breakLength,
		timeRemaining,
		intervalId,
		startStop,
		sessionBreak,
	} = useSelector((state) => state.twentyFiveClock);

	const dispatch = useDispatch();

	const intervalControlHandler = (e) => {
		if (intervalId == 0) {
			const [interval, operation] = e.target.id.split("-");
			dispatch(intervalControl({ interval, operation }));
			return;
		} else return;
	};

	const resetHandler = () => {
		if (intervalId !== 0) {
			clearInterval(intervalId);
		}
		dispatch(reset());
	};

	const startHandler = () => {
		if (intervalId == 0) {
			let interval = setInterval(() => {
				dispatch(tick());
			}, 1000);
			dispatch(start(interval));
		} else {
			clearInterval(intervalId);
			dispatch(stop());
		}
	};
	const alarm = document.getElementById("alarm");
	const dialog = document.getElementById("clock-dialog");

	const dialogHandler = () => {
		alarm.pause();
		alarm.currentTime = 0;
	};

	useEffect(() => {
		if (intervalId != 0) {
			alarm.play();
			dialog.show();
		}
	}, [sessionBreak]);

	return display ? (
		<section id="twentyFiveClock-container">
			<dialog id="clock-dialog" open>
				<div id="clock-dialog-content">
					<p>
						<span>{sessionBreak}</span>
						<span> has begun!</span>
						<span id="clock-dialog-emoji">
							{sessionBreak == "session" ? "💪" : "😌"}
						</span>
					</p>
					<form method="dialog">
						<button onClick={dialogHandler} className="clock-btn">
							OK
						</button>
					</form>
				</div>
			</dialog>
			<audio id="alarm" src={"sounds/tortTulikMal/sheep.wav"}></audio>
			<div id="twentyFiveClock">
				<h1 id="twentyFiveClock-label">{displayName}</h1>
				<div id="timer" className="clock-control">
					<div id="timer-label" className="clock-control-label">
						{sessionBreak}:
					</div>
					<button id="start_stop" className="clock-btn" onClick={startHandler}>
						{startStop}
					</button>
					<div id="time-left" className="clock-numbers">
						{timeRemaining}
					</div>
					<button id="reset" className="clock-btn" onClick={resetHandler}>
						reset
					</button>
				</div>
				<div id="break-control" className="clock-control">
					<div id="break-label" className="clock-control-label">
						Break Length:
					</div>
					<button
						id="break-increment"
						className="clock-btn"
						onClick={intervalControlHandler}
					>
						↑
					</button>
					<div id="break-length" className="clock-numbers">
						{breakLength}
					</div>
					<button
						id="break-decrement"
						className="clock-btn"
						onClick={intervalControlHandler}
					>
						↓
					</button>
				</div>
				<div id="session-control" className="clock-control">
					<div id="session-label" className="clock-control-label">
						Session Length:
					</div>
					<button
						id="session-increment"
						className="clock-btn"
						onClick={intervalControlHandler}
					>
						↑
					</button>
					<div id="session-length" className="clock-numbers">
						{sessionLength}
					</div>
					<button
						id="session-decrement"
						className="clock-btn"
						onClick={intervalControlHandler}
					>
						↓
					</button>
				</div>
			</div>
		</section>
	) : null;
};

export default TwentyFiveClock;
