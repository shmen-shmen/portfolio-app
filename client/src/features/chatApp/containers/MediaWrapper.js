import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { discardMediaDraft } from "../chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPlaybackRate } from "../chatSlice";
import "./MediaWrapper.scss";

const MediaWrapper = ({ type, contents, draft, number, messageInputRef }) => {
	const dispatch = useDispatch();
	const { mediaPlaybackRate } = useSelector((state) => state.chat);
	const mediaRef = useRef(null);

	//play pause
	const [paused, setPaused] = useState(true);
	const togglePlay = () => {
		const media = mediaRef.current;
		media.paused ? media.play() : media.pause();
		setPaused(media.paused);
	};

	//timeline scrubbing
	const timelineContainerRef = useRef(null);
	const [isScrubbing, setIsScrubbing] = useState(false);
	const [wasPaused, setWasPaused] = useState(false);

	const toggleScrubbing = (e) => {
		const media = mediaRef.current;
		const rect = timelineContainerRef.current.getBoundingClientRect();
		const percent =
			Math.min(Math.max(0, e.pageX - rect.x), rect.width) / rect.width;

		const newIsScrubbing = (e.buttons & 1) === 1;
		if (newIsScrubbing) {
			setWasPaused(media.paused);
			media.pause();
		} else {
			if (media.duration === Infinity) {
				return;
			}
			media.currentTime = media.duration * percent;
			if (!wasPaused) media.play();
		}
		setIsScrubbing(newIsScrubbing);
		handleTimelineUpdate(e, newIsScrubbing);
	};

	useEffect(() => {
		const callbackOne = (e) => {
			if (isScrubbing) {
				toggleScrubbing(e);
			}
		};
		const callbackTwo = (e) => {
			if (isScrubbing) handleTimelineUpdate(e);
		};
		document.addEventListener("mouseup", callbackOne);
		document.addEventListener("mousemove", callbackTwo);
		return () => {
			document.removeEventListener("mouseup", callbackOne);
			document.removeEventListener("mousemove", callbackTwo);
		};
	});

	const handleTimelineUpdate = (e, signal = false) => {
		const media = mediaRef.current;
		const mouseX = e.x || e.clientX;
		if (isScrubbing || signal) {
			const timelineContainer = timelineContainerRef.current;
			const rect = timelineContainer.getBoundingClientRect();
			const percent =
				Math.min(Math.max(0, mouseX - rect.x), rect.width) / rect.width;
			if (media.duration === Infinity) {
				return;
			}
			media.currentTime = media.duration * percent;
		}
		return;
	};

	const timeUpdateCallback = () => {
		const percent = mediaRef.current.currentTime / mediaRef.current.duration;
		timelineContainerRef.current.style.setProperty(
			"--progress-position",
			percent
		);
	};

	//playback speed
	useEffect(() => {
		mediaRef.current.playbackRate = mediaPlaybackRate;
	}, [mediaPlaybackRate]);

	const changePlaybackSpeed = () => {
		let newPlaybackRate = mediaPlaybackRate + 0.5;
		if (newPlaybackRate > 2) {
			newPlaybackRate = 0.5;
		}
		mediaRef.current.playbackRate = newPlaybackRate;
		dispatch(setPlaybackRate(mediaRef.current.playbackRate));
	};

	//discard draft
	const scrapDraft = () => {
		dispatch(discardMediaDraft());
	};

	return (
		<div
			className={`MediaWrapper type-${type} ${paused ? "paused" : ""} ${
				draft ? "media-draft" : ""
			} ${isScrubbing ? "scrubbing" : ""}`}
		>
			{type === "audio" ? (
				<audio
					src={contents}
					ref={mediaRef}
					onTimeUpdate={timeUpdateCallback}
					onPlay={() => {
						setPaused(mediaRef.current.paused);
					}}
					onPause={() => {
						setPaused(mediaRef.current.paused);
					}}
				></audio>
			) : (
				<video
					src={contents}
					ref={mediaRef}
					onTimeUpdate={timeUpdateCallback}
					onPlay={() => {
						setPaused(mediaRef.current.paused);
					}}
					onPause={() => {
						setPaused(mediaRef.current.paused);
					}}
				></video>
			)}
			<div className={`MediaWrapper-controls`}>
				<button
					onClick={togglePlay}
					className="media-message-control start-stop-btn"
				>
					{paused ? "▶︎" : "◼︎"}
				</button>
				<div
					className="timeline-container"
					ref={timelineContainerRef}
					onMouseDown={toggleScrubbing}
					onMouseMove={handleTimelineUpdate}
				>
					<div className="timeline">
						<div className="thumb-indicator"></div>
					</div>
				</div>
				{draft ? (
					<button
						className="media-message-control scrap-draft-btn"
						onClick={scrapDraft}
					>
						☒
					</button>
				) : (
					<button
						className="media-message-control playback-speed-btn"
						onClick={changePlaybackSpeed}
					>
						{mediaPlaybackRate + "x"}
					</button>
				)}
			</div>
		</div>
	);
};

export default MediaWrapper;
