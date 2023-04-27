import React, { useEffect, useState } from "react";
import "./random-quote-machine.css";

function RandomQuoteMachine() {
	const [quote, setQuote] = useState({
		text: "Yo Orystar Sheshen Am Qotaqtar Sap Sary Qotaq Sheshen Am Qaldyragan",
		author: "Quazaq People",
	});

	const quoteRefresh = async () => {
		fetch("https://api.api-ninjas.com/v1/quotes", {
			headers: { QUOTE_API_KEY: process.env.REACT_APP_API_KEY },
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				// setPosts(data);
			})
			.catch((err) => {
				console.log(err.message);
			});
	};

	return (
		<div className="random-quote-machine">
			<main id="quote-box">
				<div id="text">
					<em>"{quote.text}"</em>
				</div>
				<div id="author">
					<strong>{quote.author}</strong>
				</div>
				<button id="new-quote" onClick={quoteRefresh}>
					new quote
				</button>
				<div className="share-links-wrapper">
					<p>share this quote:</p>
					<div className="share-links-row">
						<a
							id="tweet-quote"
							href="twitter.com/intent/tweet"
							target={"_blank"}
						>
							twitter
						</a>
						<a href="twitter.com/intent/tweet" target={"_blank"}>
							vkontakte
						</a>
						<a href="twitter.com/intent/tweet" target={"_blank"}>
							odnoklassniki
						</a>
					</div>
				</div>
			</main>
		</div>
	);
}

export default RandomQuoteMachine;
