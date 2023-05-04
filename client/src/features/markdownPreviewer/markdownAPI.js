const fetchMarkdown = async () => {
	try {
		const response = await fetch(`/getMarkdown`);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(error);
	}
};

export default fetchMarkdown;
