// A mock function to mimic making an async request for data
export async function fetchQuote(category) {
	try {
		const response = await fetch(`/getQuote/${category}`);
		const data = await response.json();
		return data[0];
	} catch (error) {
		console.error(error);
	}
}
export async function fetchImage(category) {
	try {
		const response = await fetch(`/getImage/${category}`);

		if (!response.ok) {
			throw new Error("Failed to fetch the image.");
		}

		// Assuming the image is in Blob format (binary data)
		const imageBlob = await response.blob();

		// Create a URL for the Blob (can be used in <img> or other elements)
		const imageUrl = URL.createObjectURL(imageBlob);

		return imageUrl;
	} catch (error) {
		console.error(error);
	}
}
