let mediaRecorder;
let mediaURL;

export const startRecording = (
	videoMode,
	setRecordingVoice,
	setVoiceDraft,
	setVideoPreview,
	preview
) => {
	// console.log("PREVIEWREF", preview.current);
	return new Promise((resolve, reject) => {
		if (navigator.mediaDevices) {
			console.log("getUserMedia supported.");

			const constraints = {
				audio: true,
				video: videoMode,
			};
			let chunks = [];

			navigator.mediaDevices
				.getUserMedia(constraints)
				.then((stream) => {
					mediaRecorder = new MediaRecorder(stream);
					setTimeout(
						() => {
							mediaRecorder.start();
							videoPreviewSetup(stream, videoMode);
						},
						videoMode ? 1000 : 0
					);
					// setRecordingVoice(true);
					// preview.current.srcObject = stream;

					mediaRecorder.onstop = () => {
						console.log("data available after MediaRecorder.stop() called.");

						videoPreviewDispose();

						const dataIsEmpty = chunks[0]["size"] == 0;
						if (dataIsEmpty) {
							return;
						}
						const options = {
							audioBitsPerSecond: 128000,
							videoBitsPerSecond: 2500000,
							mimeType: videoMode
								? "video/webm;codecs=vp8,vorbis"
								: "audio/webm;codecs=opus",
						};
						const blob = new Blob(chunks, options);
						chunks = [];
						mediaURL = URL.createObjectURL(blob);
						// setRecordingVoice(false);
						// setVoiceDraft({
						// 	type: videoMode ? "video" : "audio",
						// 	contents: mediaURL,
						// });
						resolve({
							type: videoMode ? "video" : "audio",
							contents: mediaURL,
						});
						if (stream) {
							const tracks = stream.getTracks();
							tracks.forEach((track) => track.stop());
						}
					};

					mediaRecorder.ondataavailable = (e) => {
						chunks.push(e.data);
					};
				})
				.catch((err) => {
					reject(new Error(`The following error occurred: ${err}`));
				});
		} else reject(new Error("getUserMedia not supported."));
	});
};

export const stopRecording = () => {
	console.log("STOP RECORDING");
	mediaRecorder.stop();
};

let videoPreview = null;
let videoPreviewWrapper = null;
const videoPreviewSetup = (stream, videoMode) => {
	// console.log("VIDEOMODE", videoMode);
	if (!videoMode) {
		return;
	}
	console.log("PENIS PENIS");
	videoPreviewWrapper = document.createElement("div");
	videoPreviewWrapper.id = "video-preview-wrapper";
	videoPreview = document.createElement("video");
	videoPreview.id = "video-preview";
	videoPreview.autoplay = true;
	videoPreview.muted = true;
	videoPreview.srcObject = stream;
	console.log("VIDEOPEVIEW", videoPreview);
	videoPreviewWrapper.appendChild(videoPreview);
	document.querySelector(".Chats").appendChild(videoPreviewWrapper);
};
const videoPreviewDispose = () => {
	if (!videoPreview) {
		return;
	}
	videoPreview.remove();
	videoPreviewWrapper.remove();
};
