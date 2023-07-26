import "./twentyFiveClock.scss";
import { useDispatch, useSelector } from "react-redux";
import { intervalControl } from "./twentyFiveClockSlice";
import ClockAlarmMenu from "./clockAlarmMenu";
import ClockTimer from "./clockTimer";
import ClockBreakControl from "./clockBreakControl";
import ClockSessionControl from "./clockSessionControl";
import ClockDialog from "./clockDialog";

const TwentyFiveClock = () => {
	const dispatch = useDispatch();

	const { intervalId, activeAlarm } = useSelector(
		(state) => state.twentyFiveClock
	);

	//takes time in ms from store and converts it into mm:ss format for display
	const timeConverter = (milliseconds, showSeconds) => {
		let minutes, seconds;

		if (milliseconds === 3600000) {
			// display doesnt show hours
			minutes = 60;
		} else {
			minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
		}
		seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
		if (showSeconds) {
			// break/session controls don't show seconds
			return `${minutes < 10 ? "0" + minutes : minutes}:${
				seconds < 10 ? "0" + seconds : seconds
			}`;
		} else return `${minutes}`;
	};

	//handles session/break arrow buttons
	const intervalControlHandler = (e) => {
		//cant change interval if clock is running
		if (intervalId == 0) {
			const [interval, operation] = e.target.id.split("-");
			dispatch(intervalControl({ interval, operation }));
			return;
		} else return;
	};

	let beep = document.getElementById("beep");

	return (
		<section id="twentyFiveClock-container">
			<audio id="beep" src={`sounds/tortTulikMal/${activeAlarm}.wav`}></audio>
			<div id="twentyFiveClock">
				<ClockDialog beep={beep} />
				<ClockTimer timeConverter={timeConverter} beep={beep} />
				<ClockAlarmMenu />
				<div id="interval-control">
					<ClockBreakControl
						intervalControlHandler={intervalControlHandler}
						timeConverter={timeConverter}
					/>
					<ClockSessionControl
						intervalControlHandler={intervalControlHandler}
						timeConverter={timeConverter}
					/>
				</div>
			</div>
		</section>
	);
};

export default TwentyFiveClock;
