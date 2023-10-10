import React from "react";
import { useState } from "react";
import { discardVoiceDraft } from "../chatSlice";
import { useDispatch } from "react-redux";

const VoiceWrapper = ({ src, draft, number }) => {
	console.log("VOICE DRAFT SRC ", src);
	const [isPlaying, setIsPlaying] = useState(false);
	const [timeline, setTimeline] = useState(0);
	const dispatch = useDispatch();
	const identifier = `voice-${draft ? "draft" : "message-" + number}`;

	const handlePlayPausePress = (e) => {
		e.preventDefault();
		const audio = document.getElementById(identifier);
		console.log(audio.src);
		if (audio.paused) {
			setIsPlaying(true);
			audio.play();
		} else {
			setIsPlaying(false);
			audio.pause();
		}
	};

	const changeTimelinePosition = (e) => {
		console.log("timeupdate");
		let audio;
		switch (e.type) {
			case "change":
				// console.log("onchange");
				audio = document.getElementById(identifier);

				const audioHasLoaded = isFinite(audio.duration);
				if (audioHasLoaded) {
					const time = (audio.duration * e.target.value) / 100;
					audio.currentTime = time;
					// audio.pause();
					// setIsPlaying(false);
					setTimeline(e.target.value);
				}
				// else waitForAudioToLOad();
				break;
			case "timeupdate":
				// console.log("timeupdate");
				audio = e.target;
				if (audio.currentTime && audio.duration) {
					const percentagePosition = (100 * audio.currentTime) / audio.duration;
					setTimeline(percentagePosition);
				}
				// else {
				// 	return;
				// }
				break;
			case "ended":
				console.log("onended");
				setTimeline(0);
				setIsPlaying(false);
				break;
			default:
				break;
		}
	};

	const handleScrapPress = (e) => {
		e.preventDefault();
		dispatch(discardVoiceDraft());
	};

	return (
		<div className="VoiceWrapper">
			<audio
				src={src}
				id={identifier}
				onEnded={changeTimelinePosition}
				onTimeUpdate={changeTimelinePosition}
			></audio>
			<button onClick={handlePlayPausePress} className="voice-message-control">
				{isPlaying ? "pause" : "play"}
			</button>
			<input
				type="range"
				max="100"
				value={timeline}
				onChange={changeTimelinePosition}
			></input>
			{draft ? (
				<button className="voice-message-control" onClick={handleScrapPress}>
					scrap
				</button>
			) : null}
		</div>
	);
};

export default VoiceWrapper;
