import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNewQuote, selectCategory } from "./randomQuoteSlice";
import "./randomQuoteMachine.scss";

import {
	EmailShareButton,
	LinkedinShareButton,
	RedditShareButton,
	TelegramShareButton,
	TwitterShareButton,
} from "react-share";
import { NavLink } from "react-router-dom";

function RandomQuoteMachine() {
	const { isLoading, quote, categories, category } = useSelector(
		(state) => state.randomQuote
	);
	const dispatch = useDispatch();
	const [closeBtnHover, setCloseBtnHover] = useState(false);
	const upperRef = useRef();
	// 👇 TURN THIS BACK ON WHEN READY FOR PRODUCTION

	useEffect(() => {
		setCloseBtnHover(false);
	}, []);

	useEffect(() => {
		if (upperRef.current) {
			upperRef.current.scrollTop = 0;
		}
	}, [quote]);

	return (
		<section id="quote-box">
			<div className="upper" ref={upperRef}>
				<NavLink
					to={"/"}
					className="btn close-btn"
					onMouseOver={() => {
						setCloseBtnHover(true);
					}}
					onMouseLeave={() => {
						setCloseBtnHover(false);
					}}
				>
					{window.innerWidth <= 900 ? "x" : closeBtnHover ? "x" : "o"}
				</NavLink>
				<div id="quote-container">
					<span id="text">"{quote.quote}"</span>
					<br />
					<span id="author"> – {quote.author}</span>
				</div>
			</div>
			<div id="new-quote">
				<p
					id="new-quote-left"
					onClick={() => {
						if (!isLoading) {
							dispatch(getNewQuote(category));
						}
					}}
				>
					new quote{" "}
					{category === "no-category" ? null : <span>about {category}</span>}
				</p>
				<p id="new-quote-right">
					<span>select</span> category:
				</p>
			</div>
			<div className="lower">
				<div id="share-section">
					<span>share this quote on:</span>
					<TwitterShareButton
						children="Twitter"
						className="share-link"
						url="https://mayweeds-app.glitch.me/randomQuoteMachine"
						title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
						resetButtonStyle={false}
					/>
					<LinkedinShareButton
						children="LinkedIn"
						className="share-link"
						url="https://mayweeds-app.glitch.me/randomQuoteMachine"
						title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
						resetButtonStyle={false}
					/>
					<EmailShareButton
						children="Email"
						className="share-link"
						url="https://mayweeds-app.glitch.me/randomQuoteMachine"
						title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
						resetButtonStyle={false}
					/>

					<RedditShareButton
						children="Reddit"
						className="share-link"
						url="https://mayweeds-app.glitch.me/randomQuoteMachine"
						title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
						resetButtonStyle={false}
					/>

					<TelegramShareButton
						children="Telegram"
						className="share-link"
						url="https://mayweeds-app.glitch.me/randomQuoteMachine"
						title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
						resetButtonStyle={false}
					/>
				</div>
				<div id="category-section">
					{categories.map((keyword) => {
						return (
							<span
								key={"category-" + keyword}
								className={`category-keyword ${
									keyword === category ? "category-keyword-select" : null
								}`}
								onClick={() => {
									dispatch(selectCategory(keyword));
								}}
							>
								{keyword}
							</span>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default RandomQuoteMachine;
