import React from "react";
import undefinedCard from "../../assets/img/undefined-card.png";
import { StarRating } from "../../components";
import { IMovie } from "../../interfaces";
import { getUrlPosterImage } from "../../utils/get-url-images";
import "./style.scss";

interface IMovieCardProps {
	movie: IMovie;
	color: string;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ color, movie }) => (
	<div className="movie-card k-overflow-hidden k-bg-black k-d-flex k-justify-content-center k-align-items-start k-relative">
		<div className="body k-d-flex k-justify-content-center k-align-items-center">
			<img
				src={movie.poster_path ? getUrlPosterImage(movie.poster_path) : undefinedCard}
				alt={movie.title}
				className="image"
			/>
		</div>
		<div className="footer" style={{ backgroundColor: `${color}cc` }}>
			<p className="k-text-white k-text-center k-fs-xl k-text-truncate k-px-4 k-pt-2.5">
				{movie?.title ? movie.title : "Sem título"}
			</p>
			<p className="k-text-center k-fs-md k-text-white k-font-medium">
				{movie.genres[0] ? movie.genres[0].name : "Sem gênero"}
			</p>
			<StarRating voteAverage={movie.vote_average} />
			<div className="k-display-flex k-justify-content-center k-p-2.5">
				<p className="release-date k-text-white">
					{String(new Date(movie?.release_date).getFullYear())}
				</p>
			</div>
		</div>
	</div>
);
