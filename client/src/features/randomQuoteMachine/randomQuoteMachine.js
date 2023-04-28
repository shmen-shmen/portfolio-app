// import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideQuotes, getNewQuote } from "./randomQuoteSlice";
import "./randomQuoteMachine.css";

function RandomQuoteMachine() {
	const { display, quote } = useSelector((state) => state.randomQuote);
	const dispatch = useDispatch();

	// const quoteRefresh = async () => {
	// 	fetch("https://api.api-ninjas.com/v1/quotes", {
	// 		headers: { QUOTE_API_KEY: process.env.REACT_APP_API_KEY },
	// 	})
	// 		.then((response) => response.json())
	// 		.then((data) => {
	// 			console.log(data);
	// 			// setPosts(data);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err.message);
	// 		});
	// };

	if (display) {
		return (
			<div className="random-quote-machine">
				<main id="quote-box">
					<button
						onClick={() => {
							dispatch(hideQuotes());
						}}
					>
						X CLOSE WINDOW X
					</button>
					<div id="text">
						<em>"{quote.text}"</em>
					</div>
					<div id="author">
						<strong>{quote.author}</strong>
					</div>
					<button
						id="new-quote"
						onClick={() => {
							dispatch(getNewQuote());
						}}
					>
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
	} else {
		return null;
	}
}

export default RandomQuoteMachine;
