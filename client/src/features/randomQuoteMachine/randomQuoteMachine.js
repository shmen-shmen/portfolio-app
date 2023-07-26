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
				<div>{closeBtnHover ? "x" : "o"}</div>
			</NavLink>
			<div className="upper" ref={upperRef}>
				<div id="quote-container">
					<p id="text">"{quote.quote}"</p>
					<p id="author"> – {quote.author}</p>
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
				<p id="new-quote-right">select category:</p>
			</div>
			<div className="lower">
				<div id="share-section">
					<span>share this quote on:</span>
					<div className="share-links">
						<TwitterShareButton
							children="Twitter"
							className="share-link"
							url="https://zippy-inky-radar.glitch.me/"
							title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
							resetButtonStyle={false}
						/>
						<LinkedinShareButton
							children="LinkedIn"
							className="share-link"
							url="https://zippy-inky-radar.glitch.me/"
							title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
							resetButtonStyle={false}
						/>
						<EmailShareButton
							children="Email"
							className="share-link"
							url="https://zippy-inky-radar.glitch.me/"
							title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
							resetButtonStyle={false}
						/>
						<RedditShareButton
							children="Reddit"
							className="share-link"
							url="https://zippy-inky-radar.glitch.me/"
							title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
							resetButtonStyle={false}
						/>
						<TelegramShareButton
							children="Telegram"
							className="share-link"
							url="https://zippy-inky-radar.glitch.me/"
							title={`"${quote.quote}"\n– ${quote.author}\n\nDamn what a deep thought 🤔. Wonder where I could find more... `}
							resetButtonStyle={false}
						/>
					</div>
				</div>
				<div id="category-section">
					{categories.map((keyword) => {
						return (
							<span
								key={"category-" + keyword}
								className="category-keyword"
								onClick={() => {
									dispatch(selectCategory(keyword));
								}}
								style={keyword === category ? { backgroundColor: "red" } : null}
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
