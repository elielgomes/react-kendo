import React from "react";
import { StarRating } from "../../components";
import { IMovie } from "../../interfaces";
import { getUrlPosterImage } from "../../utils/get-url-images";
import "./style.scss";

interface IMovieCardProps {
	movie: IMovie;
	genre?: string | null;
	color: string;
}

export const MovieCard: React.FC<IMovieCardProps> = ({ color, movie, genre = "Drama" }) => (
	<div className="movie-card k-overflow-hidden k-bg-black k-d-flex k-justify-content-center k-align-items-start k-relative">
		<div className="body k-d-flex k-justify-content-center k-align-items-center">
			<img src={getUrlPosterImage(movie.poster_path)} alt={movie.title} className="image" />
		</div>
		<div className="footer" style={{ backgroundColor: `${color}cc` }}>
			<p className="k-text-white k-text-center k-fs-xl k-text-truncate k-px-4 k-pt-2.5">
				{movie?.title}
			</p>
			{genre && <p className="k-text-center k-fs-md k-text-white k-font-medium">{genre}</p>}
			<StarRating voteAverage={movie.vote_average} />
			<div className="k-display-flex k-justify-content-center k-p-2.5">
				<p className="release-date k-text-white">
					{String(new Date(movie?.release_date).getFullYear())}
				</p>
			</div>
		</div>
	</div>
);
