let videoPreview = null;
let videoPreviewWrapper = null;

export const visualizeVideo = (stream) => {
	videoPreviewWrapper = document.createElement("div");
	videoPreviewWrapper.id = "video-preview-wrapper";
	videoPreview = document.createElement("video");
	videoPreview.id = "video-preview";
	videoPreview.autoplay = true;
	videoPreview.muted = true;
	videoPreview.srcObject = stream;
	videoPreviewWrapper.appendChild(videoPreview);
	document.querySelector(".Chats").appendChild(videoPreviewWrapper);
};

export const videoPreviewDispose = () => {
	if (!videoPreview) {
		return;
	}
	videoPreview.remove();
	videoPreviewWrapper.remove();
};
