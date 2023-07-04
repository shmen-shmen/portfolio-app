import { useSelector, useDispatch } from "react-redux";
import { toggleAlarmMenu, selectAlarm } from "./twentyFiveClockSlice";

const TwentyFiveClockMenu = () => {
	const dispatch = useDispatch();

	const { displayName, alarms, alarmMenu, activeAlarm } = useSelector(
		(state) => state.twentyFiveClock
	);

	const showMenu = () => {
		dispatch(toggleAlarmMenu(true));
	};

	const hideMenu = () => {
		dispatch(toggleAlarmMenu(false));
	};

	const selectAlarmHandler = (e) => {
		dispatch(selectAlarm(e.target.id));
	};

	return (
		<div
			id="clock-label-menu"

			// onMouseOver={showMenu} onMouseLeave={hideMenu}
		>
			{alarmMenu ? (
				<div id="alarm-menu">
					{alarms.map((alarm) => {
						return (
							<span
								id={alarm}
								className={alarm == activeAlarm ? "active-alarm" : null}
								key={alarm + "-key"}
								onDoubleClick={selectAlarmHandler}
							>
								{alarm}
							</span>
						);
					})}
				</div>
			) : (
				<h1 id="twentyFiveClock-label">{displayName}</h1>
			)}
		</div>
	);
};

export default TwentyFiveClockMenu;
