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
