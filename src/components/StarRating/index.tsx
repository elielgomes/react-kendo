import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { formatStarRating } from "../../utils/format-star-rating";

interface IStarRatingProps {
	voteAverage: number;
}

export const StarRating: React.FC<IStarRatingProps> = ({ voteAverage = 0 }) => {
	const arrStars = formatStarRating(voteAverage);
	return (
		<div className="rating k-d-flex k-justify-content-center k-align-items-center k-p-2.5 k-gap-2">
			{arrStars.map((e, index) => (
				<span key={index}>
					{e === "Full" && <BsStarFill color="#fff" />}
					{e === "Half" && <BsStarHalf color="#fff" />}
					{e === "Void" && <BsStar color="#fff" />}
				</span>
			))}
		</div>
	);
};
