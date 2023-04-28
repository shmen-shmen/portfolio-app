import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideQuotes, getNewQuote } from "./randomQuoteSlice";
import "./randomQuoteMachine.css";

function RandomQuoteMachine() {
	const { display, quote } = useSelector((state) => state.randomQuote);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNewQuote());
	}, []);

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
						<em>"{quote.quote}"</em>
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
