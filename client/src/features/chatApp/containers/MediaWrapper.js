import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { discardMediaDraft } from "../chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setPlaybackRate } from "../chatSlice";
import "./MediaWrapper.scss";

const MediaWrapper = ({
	type,
	contents,
	draft,
	duration,
	number,
	messageInputRef,
}) => {
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
	const isScrubbingRef = useRef(isScrubbing);

	useEffect(() => {
		isScrubbingRef.current = isScrubbing;
		document
			.querySelector(".ChatApp")
			.classList.toggle("fingerScrubbing", isScrubbing);
	}, [isScrubbing]);

	const toggleScrubbing = (e) => {
		const media = mediaRef.current;
		const rect = timelineContainerRef.current.getBoundingClientRect();
		const decideX = () => {
			switch (e.type) {
				case "touchmove":
					return e.changedTouches[0]["pageX"];
				case "touchstart":
					return e.touches[0]["clientX"];
				default:
					return e.x || e.clientX;
			}
		};
		const mouseX = decideX();
		const percent =
			Math.min(Math.max(0, mouseX - rect.x), rect.width) / rect.width;
		const newIsScrubbing =
			(e.buttons & 1) === 1 || ("touches" in e && e.touches.length > 0);
		if (newIsScrubbing) {
			setWasPaused(media.paused);
			media.pause();
			media.currentTime = duration * percent;
		} else {
			if (!wasPaused) media.play();
		}
		setIsScrubbing(newIsScrubbing);
		// this is not necessary i believe
		// handleTimelineUpdate(e, newIsScrubbing);
	};

	const handleTimelineUpdate = (e, signal = false) => {
		const media = mediaRef.current;
		const mouseX =
			e.type === "touchmove" ? e.changedTouches[0]["pageX"] : e.x || e.clientX;
		if (isScrubbingRef.current || signal) {
			const timelineContainer = timelineContainerRef.current;
			const rect = timelineContainer.getBoundingClientRect();
			const percent =
				Math.min(Math.max(0, mouseX - rect.x), rect.width) / rect.width;
			timelineContainer.style.setProperty("--progress-position", percent);
			media.currentTime = duration * percent;
		}
	};

	useEffect(() => {
		const stopScrub = (e) => {
			if (isScrubbingRef.current) {
				toggleScrubbing(e);
			}
		};
		const scrubFromAnywhere = (e) => {
			if (isScrubbingRef.current) handleTimelineUpdate(e);
		};
		const media = mediaRef.current;
		const mediaPlayCallback = () => {
			setPaused(media.paused);
		};
		const mediaPauseCallback = () => {
			setPaused(media.paused);
		};
		const timelineContainer = timelineContainerRef.current;
		const mediaEndedCallback = () => {
			//hide the fact that progress bar is not actually
			//at the end of timeline, it's all fake
			timelineContainer.style.setProperty("--progress-position", 1);
		};
		const timeUpdateCallback = () => {
			const percent = media.currentTime / duration;
			timelineContainer.style.setProperty("--progress-position", percent);
		};
		timelineContainer.addEventListener("pointerdown", toggleScrubbing);
		document.addEventListener("pointerup", stopScrub);
		document.addEventListener("pointermove", scrubFromAnywhere);
		media.addEventListener("timeupdate", timeUpdateCallback);
		media.addEventListener("play", mediaPlayCallback);
		media.addEventListener("pause", mediaPauseCallback);
		media.addEventListener("ended", mediaEndedCallback);
		return () => {
			timelineContainer.removeEventListener("pointerdown", toggleScrubbing);
			document.removeEventListener("pointerup", stopScrub);
			document.removeEventListener("pointermove", scrubFromAnywhere);
			media.removeEventListener("timeupdate", timeUpdateCallback);
			media.removeEventListener("play", mediaPlayCallback);
			media.removeEventListener("pause", mediaPauseCallback);
			media.removeEventListener("ended", mediaEndedCallback);
		};
	});

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
			ref={messageInputRef}
		>
			{type === "audio" ? (
				<audio src={contents} ref={mediaRef}></audio>
			) : (
				<video src={contents} ref={mediaRef}></video>
			)}
			<div className={`MediaWrapper-controls`}>
				<button
					onClick={togglePlay}
					className="media-message-control start-stop-btn"
				>
					{paused ? "▶︎" : "◼︎"}
				</button>
				<div className="timeline-container" ref={timelineContainerRef}>
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
