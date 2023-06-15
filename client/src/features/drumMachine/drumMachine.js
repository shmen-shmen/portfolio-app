import { useSelector, useDispatch } from "react-redux";
import {
	hide_drumMachine,
	padPress,
	padRelease,
	sampleEnd,
} from "./drumMachineSlice";
import "./drumMachine.scss";
import { useEffect, useRef } from "react";

const DrumMachine = () => {
	const dispatch = useDispatch();
	const { display, pads, nowPlaying } = useSelector(
		(state) => state.drumMachine
	);
	const padsRef = useRef(null);
	useEffect(() => {
		if (display) {
			padsRef.current.focus();
		}
	}, [display]);

	const handlePadPress = (e) => {
		let padId;
		e.code
			? (padId = e.code.replace(/^Key/, ""))
			: (padId = e.target.id.replace(/^pad-/, ""));

		if (padId in pads) {
			switch (e.type) {
				case "keydown":
				case "mousedown":
					dispatch(padPress(padId));
					document.getElementById(padId).play();
					break;
				case "keyup":
					dispatch(padRelease(padId));
					dispatch(sampleEnd(padId));
					document.getElementById(padId).pause();
					document.getElementById(padId).load();
					break;
				case "mouseup":
					dispatch(padRelease(padId));
					break;
				default:
					break;
			}
		}
	};

	const handleSampleEnd = (e) => {
		const padId = e.target.id;
		dispatch(sampleEnd(padId));
	};

	if (display) {
		return (
			<section
				id="drum-machine"
				ref={padsRef}
				tabIndex={0}
				onKeyDown={handlePadPress}
				onKeyUp={handlePadPress}
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
				<div id="display">
					{nowPlaying.map((emoji) => {
						return <span className="now-playing">{emoji}</span>;
					})}
				</div>
				<div className="pad-bank">
					{Object.keys(pads).map((pad) => {
						const status = pads[pad]["press"];
						return (
							<div
								id={"pad-" + pad}
								key={"pad-" + pad}
								onMouseDown={handlePadPress}
								onMouseUp={handlePadPress}
								className={`drum-pad drum-pad-${status}`}
							>
								<span className="center">{`${pad}`}</span>
								<audio
									className="clip"
									id={pad}
									src={`/sounds/tortTulikMal/${pads[pad]["sample"]}.wav`}
									onEnded={handleSampleEnd}
								></audio>
							</div>
						);
					})}
				</div>
			</section>
		);
	} else {
		return null;
	}
};

export default DrumMachine;
