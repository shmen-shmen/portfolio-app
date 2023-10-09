import React from "react";
import { useState } from "react";
import { discardVoiceDraft } from "../chatSlice";
import { useDispatch } from "react-redux";

const VoiceDraft = ({ voiceDraft }) => {
	const { url } = voiceDraft;
	const [isPlaying, setIsPlaying] = useState(false);
	const [timeline, setTimeline] = useState(0);
	const dispatch = useDispatch();

	const handlePlayPausePress = (e) => {
		e.preventDefault();
		const audio = document.getElementById("audio");
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
				audio = document.getElementById(`audio`);

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
		<div className="Message__input__VoiceDraft">
			<audio
				src={url}
				className="Message__input"
				id="audio"
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
			<button className="voice-message-control" onClick={handleScrapPress}>
				scrap
			</button>
		</div>
	);
};

export default VoiceDraft;
