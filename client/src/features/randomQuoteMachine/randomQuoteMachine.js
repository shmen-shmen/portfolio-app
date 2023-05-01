import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideQuotes, getNewQuote, selectCategory } from "./randomQuoteSlice";
import "./randomQuoteMachine.css";

function RandomQuoteMachine() {
	const { display, quote, categories, category } = useSelector(
		(state) => state.randomQuote
	);
	const dispatch = useDispatch();

	const [closeHover, setCloseBtnHover] = useState(false);
	// 👇 TURN THIS BACK ON WHEN READY FOR PRODUCTION
	useEffect(() => {
		console.log("quote requested from RQM.js");
		dispatch(getNewQuote());
	}, []);

	useEffect(() => {
		setCloseBtnHover(false);
	}, [display]);

	if (display) {
		return (
			<section id="quote-box">
				<button
					className="btn close-btn"
					onMouseOver={() => {
						setCloseBtnHover(true);
					}}
					onMouseLeave={() => {
						setCloseBtnHover(false);
					}}
					onClick={() => {
						dispatch(hideQuotes());
					}}
				>
					{closeHover ? "☒" : "☐"}
				</button>
				<div className="upper">
					<div id="quote-container">
						<p id="text">"{quote.quote}"</p>
						<p id="author">{quote.author}</p>
					</div>
				</div>
				<button id="new-quote">
					<p
						id="new-quote-left"
						onClick={() => {
							console.log("CATEGORY IS " + category);
							dispatch(getNewQuote(category));
						}}
					>
						new quote
					</p>
					<p id="new-quote-right">choose category</p>
				</button>
				<div className="lower">
					<div id="share-section">
						<span>share this quote:</span>
						<a
							id="tweet-quote"
							href="twitter.com/intent/tweet"
							target={"_blank"}
							className="share-link"
						>
							twitter
						</a>
						<a
							href="http://vk.com/share.php?url=http://***"
							target={"_blank"}
							className="share-link"
						>
							{/* https://vk.com/dev/widget_share  */}
							vkontakte
						</a>
						<a
							href="https://connect.ok.ru/offer?url=http://***"
							target={"_blank"}
							className="share-link"
						>
							{/* https://qna.habr.com/q/74050   */}
							odnoklassniki
						</a>
					</div>
					<div id="category-section">
						{categories.map((keyword) => {
							return (
								<p
									key={"category-" + keyword}
									className="category-keyword"
									onClick={() => {
										dispatch(selectCategory(keyword));
									}}
									style={
										keyword === category ? { backgroundColor: "red" } : null
									}
								>
									{keyword}
								</p>
							);
						})}
					</div>
				</div>
			</section>
		);
	} else {
		return null;
	}
}

export default RandomQuoteMachine;
