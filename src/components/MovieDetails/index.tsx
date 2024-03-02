import React from "react";
import { BsPlay } from "react-icons/bs";
import { IDetailsProps } from "../../pages/Details";
import { ModalMovie } from "../ModalMovie";
import "./style.scss";
import { useMovieDetails } from "./useMovieDetails";

interface IMovieDetailsProps {
	details: IDetailsProps;
	bgColor: string;
}

export const MovieDetails: React.FC<IMovieDetailsProps> = ({ details, bgColor }) => {
	const {
		movie,
		disclosure,
		trailerKey,
		voteInPercentage,
		textColor,
		borderColor,
		voteColor,
		handlePlayTrailer,
		navigate,
	} = useMovieDetails(details, bgColor);

	return (
		<>
			{trailerKey && (
				<ModalMovie
					trailerKey={trailerKey}
					isOpen={disclosure.isOpen}
					onClose={disclosure.onClose}
				/>
			)}
			<div className="movie-details">
				{movie.vote_average && (
					<p className={`k-font-bold k-fs-xl ${voteColor}`}>{voteInPercentage}%</p>
				)}
				<div className="k-d-flex k-justify-content-between k-align-items-center k-w-full k-gap-5.5 ">
					<h1 className={`title ${textColor}`}>{movie?.title}</h1>
					{movie?.release_date && (
						<p className={`release-date ${textColor}`}>
							{String(new Date(movie.release_date).getFullYear())}
						</p>
					)}
				</div>
				<div className="k-d-flex k-gap-5">
					{movie.genres &&
						movie.genres?.map((genre) => (
							<span key={genre.id} className={`k-fs-md k-font-medium ${textColor}`}>
								{genre.name.toLocaleUpperCase()}
							</span>
						))}
				</div>
				<p className={`k-fs-md k-text-justify ${textColor}`}>
					{movie.overview ||
						"Não conseguimos encontrar informações sobre a sinopse deste filme!"}
				</p>
				<div className="k-d-flex k-gap-8">
					<button
						type="button"
						onClick={handlePlayTrailer}
						className={`btn-movie k-cursor-pointer ${borderColor} ${textColor}`}
					>
						<BsPlay size={30} />
						Trailer
					</button>
					<button
						type="button"
						onClick={() => navigate(-1)}
						className={`btn-movie k-cursor-pointer ${borderColor} ${textColor}`}
					>
						Voltar
					</button>
				</div>
			</div>
		</>
	);
};
