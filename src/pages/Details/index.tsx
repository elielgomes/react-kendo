import React from "react";
import { useParams } from "react-router-dom";
import { FloatButtonHome, Loading, MovieDetails } from "../../components";
import { IMovie } from "../../interfaces";
import "./style.scss";
import { useDetails } from "./use-details";

export interface IDetailsProps {
	trailerKey?: string;
	movie: IMovie;
}

export const Details: React.FC = () => {
	const { id } = useParams();

	const { color, details, movieImageBackdropUrl, movieImagePosterUrl, loading } = useDetails(
		id || "",
	);

	return loading ? (
		<Loading />
	) : (
		<main className="k-min-h-screen">
			<FloatButtonHome />
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
