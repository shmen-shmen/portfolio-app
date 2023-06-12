import { useSelector, useDispatch } from "react-redux";
import { hide_drumMachine, padPress, padRelease } from "./drumMachineSlice";
import "./drumMachine.css";

const DrumMachine = () => {
	const { display, pads } = useSelector((state) => state.drumMachine);
	const dispatch = useDispatch();

	if (display) {
		return (
			<section
				id="drum-machine"
				tabIndex={0}
				onKeyDown={(e) => {
					dispatch(padPress(e.code));
					const padId = e.code.replace(/^Key/, "");
					document.getElementById(padId).play();
				}}
				onKeyUp={(e) => {
					dispatch(padRelease(e.code));
					const padId = e.code.replace(/^Key/, "");
					document.getElementById(padId).pause();
					document.getElementById(padId).load();
				}}
			>
				<button
					id="drums-close-btn"
					className="drums-btn"
					onClick={() => {
						dispatch(hide_drumMachine());
					}}
				>
					✕
				</button>
				<div className="pad-bank">
					{Object.keys(pads).map((pad) => {
						const status = pads[pad];
						return (
							<div
								id={"pad-" + pad}
								key={"pad-" + pad}
								className={`drum-pad drum-pad-${status}`}
								onMouseDown={() => {
									dispatch(padPress(pad));
								}}
								onMouseUp={() => {
									dispatch(padRelease(pad));
								}}
							>
								{pad}
								<audio
									className="clip"
									id={pad}
									src="/sounds/427428__fthgurdy__muezzins-call-to-prayer-in-almaty-kazakhstan.wav"
								></audio>
							</div>
						);
					})}
				</div>
				<div id="display"></div>
			</section>
		);
	} else {
		return null;
	}
};

export default DrumMachine;
