import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { discardMediaDraft } from "../chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPlaybackRate } from "../chatSlice";
import "./MediaWrapper.scss";

const MediaWrapper = ({ type, contents, draft, number }) => {
	const dispatch = useDispatch();

	const [isPlaying, setIsPlaying] = useState(false);
	const [timeline, setTimeline] = useState(0);
	const { mediaPlaybackRate } = useSelector((state) => state.chat);

	const audioRef = useRef(null);
	const identifier = `voice-${draft ? "draft" : "message-" + number}`;

	const handlePlayPausePress = (e) => {
		e.preventDefault();
		const audio = audioRef.current;
		if (audio.paused) {
			setIsPlaying(true);
			audio.play();
		} else {
			setIsPlaying(false);
			audio.pause();
		}
	};

	const handlePlaybackRatePress = () => {
		dispatch(setPlaybackRate());
	};

	useEffect(() => {
		audioRef.current.playbackRate = mediaPlaybackRate;
	}, [mediaPlaybackRate]);

	const changeTimelinePosition = (e) => {
		let audio;
		// console.log("timeupdate");
		switch (e.type) {
			case "change":
				// console.log("onchange");
				audio = audioRef.current;
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
				setTimeline(0);
				setIsPlaying(false);
				break;
			default:
				break;
		}
	};

	const handleScrapPress = (e) => {
		e.preventDefault();
		dispatch(discardMediaDraft());
	};

	return (
		<div
			className={`MediaWrapper type-${type} isPlaying-${isPlaying} MediaDraft-${draft}`}
		>
			{type == "audio" ? (
				<audio
					src={contents}
					id={identifier}
					ref={audioRef}
					onEnded={changeTimelinePosition}
					onTimeUpdate={changeTimelinePosition}
				></audio>
			) : (
				<video
					src={contents}
					id={identifier}
					ref={audioRef}
					onEnded={changeTimelinePosition}
					onTimeUpdate={changeTimelinePosition}
				></video>
			)}
			<div className={`MediaWrapper_controls_wrapper MediaDraft-${draft}`}>
				<button
					onClick={handlePlayPausePress}
					className="media-message-control start-stop-btn"
				>
					{isPlaying ? "■" : "►"}
				</button>
				<input
					type="range"
					min="0"
					max="100"
					value={timeline}
					onChange={changeTimelinePosition}
				></input>
				{draft ? (
					<button
						className="media-message-control scrap-draft-btn"
						onClick={handleScrapPress}
					>
						scrap
					</button>
				) : (
					<button
						className="media-message-control playback-speed-btn"
						onClick={handlePlaybackRatePress}
					>
						{mediaPlaybackRate + "x"}
					</button>
				)}
			</div>
		</div>
	);
};

export default MediaWrapper;