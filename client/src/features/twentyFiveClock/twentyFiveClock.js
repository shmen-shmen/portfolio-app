import { useDispatch, useSelector } from "react-redux";
const TwentyFiveClock = () => {
	const { display, displayName } = useSelector(
		(state) => state.twentyFiveClock
	);

	const dispatch = useDispatch();

	return display ? (
		<section id="twentyFiveClock-container">
			<h1>{displayName}</h1>
		</section>
	) : null;
};

export default TwentyFiveClock;
