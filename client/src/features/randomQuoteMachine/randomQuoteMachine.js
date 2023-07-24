import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	hide_randomQuote,
	getNewQuote,
	getNewImage,
	selectCategory,
} from "./randomQuoteSlice";
import "./randomQuoteMachine.scss";
import { show_appSelector } from "../appSelector/appSelectorSlice";

function RandomQuoteMachine() {
	const { display, isLoading, quote, categories, category, image } =
		useSelector((state) => state.randomQuote);
	const dispatch = useDispatch();
	const [closeBtnHover, setCloseBtnHover] = useState(false);
	const upperRef = useRef();
	// 👇 TURN THIS BACK ON WHEN READY FOR PRODUCTION
	useEffect(() => {
		dispatch(getNewQuote(category));
	}, []);

	useEffect(() => {
		setCloseBtnHover(false);
	}, [display]);

	useEffect(() => {
		console.log(image);
	}, [image]);

	useEffect(() => {
		if (upperRef.current) {
			upperRef.current.scrollTop = 0;
		}
	}, [quote]);

	const handleExit = () => {
		dispatch(hide_randomQuote());
		dispatch(show_appSelector());
	};

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
					onClick={handleExit}
				>
					<div>{closeBtnHover ? "x" : "o"}</div>
				</button>
				<div className="upper" ref={upperRef}>
					<div id="quote-container">
						<img id="quotes-image" src={image} alt="" />
						<p id="text">"{quote.quote}"</p>
						<p id="author"> – {quote.author}</p>
					</div>
				</div>
				<div id="new-quote">
					<p
						id="new-quote-left"
						onClick={() => {
							if (!isLoading) {
								dispatch(getNewImage("nature"));
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
								<span
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
								</span>
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
