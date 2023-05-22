import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	hide_randomQuote,
	getNewQuote,
	selectCategory,
} from "./randomQuoteSlice";
import "./randomQuoteMachine.css";

function RandomQuoteMachine() {
	const { display, isLoading, quote, categories, category } = useSelector(
		(state) => state.randomQuote
	);
	const dispatch = useDispatch();
	const [closeBtnHover, setCloseBtnHover] = useState(false);
	const upperRef = useRef();
	// 👇 TURN THIS BACK ON WHEN READY FOR PRODUCTION
	// useEffect(() => {
	// 	dispatch(getNewQuote(category));
	// }, []);
	useEffect(() => {
		setCloseBtnHover(false);
	}, [display]);

	useEffect(() => {
		if (upperRef.current) {
			upperRef.current.scrollTop = 0;
		}
	}, [quote]);

	// useEffect(() => {
	// 	upperRef.current.scrollTop = 0;
	// }, [quote]);

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
						dispatch(hide_randomQuote());
					}}
				>
					{closeBtnHover ? "☒" : "☐"}
				</button>
				{closeBtnHover ? (
					<div id="about">
						The app renders a random quote from the internet onto the screen.
						Additional functionality includes the ability to choose a quote of a
						specific category from the given list and to share it on social
						networks. <br />
						<br /> The design of the app aims to reflect it's meaninglessness.
						The interface is made to be counterintuitive, frustrating and
						struggling to use. Elements scroll off the screen, blink and
						disappear to annoy and distract the User. The main substance, the
						text of a quote – is hidden from the User, and the main element
						intead is the exit button, which suggests the User should not waste
						any more time here. <br />
						<br /> On the other hand, the visuals are made to be appealing for a
						potential reader of quotes – pieces of text stripped of any context
						and meaning, lowered to the level of content. If i were to try and
						sell this app, I would use words like "minimalist", and "thought
						provoking" in order to imply a deeper meaning, although there is
						obviously no meaning at all. Enjoy!
					</div>
				) : null}
				<div className="upper" ref={upperRef}>
					<div id="quote-container">
						<p id="text">"{quote.quote}"</p>
						<p id="author">{quote.author}</p>
					</div>
				</div>
				<div id="new-quote">
					<p
						id="new-quote-left"
						onClick={() => {
							isLoading || dispatch(getNewQuote(category));
						}}
					>
						request new quote{" "}
						{category === "no-category" ? null : <span>about {category}</span>}
					</p>
					<p id="new-quote-right">choose category:</p>
				</div>
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
