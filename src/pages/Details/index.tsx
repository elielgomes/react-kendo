import React from "react";
import { useParams } from "react-router-dom";
import { MovieDetails } from "../../components/MovieDetails";
import { IMovie } from "../../interfaces";
import "./style.scss";
import { useDetails } from "./useDetails";

export interface IDetailsProps {
	trailerKey?: string;
	movie: IMovie;
}

export const Details: React.FC = () => {
	const { id } = useParams();

	const { color, details, movieImageBackdropUrl, movieImagePosterUrl } = useDetails(id || "");

	return (
		<main className="k-min-h-screen">
			<section className="section-details">
				<div className="movie-details-wrapper" style={{ backgroundColor: color }}>
					{details && <MovieDetails details={details} bgColor={color} />}
				</div>
				<div
					className="background-movie"
					style={{
						backgroundImage: `linear-gradient(var(--horientation), transparent 0%,${color} 100%), url(${
							movieImageBackdropUrl ? movieImageBackdropUrl : movieImagePosterUrl
						})`,
					}}
				/>
			</section>
		</main>
	);
};
