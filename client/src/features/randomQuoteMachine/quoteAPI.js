// A mock function to mimic making an async request for data
export async function fetchQuote(keyword) {
	console.log(keyword);
	const response = await fetch("/getQuote");
	const data = await response.json();
	return data[0];
}
