import { getContrast } from "polished";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "../../hooks/use-disclosure";
import { IDetailsProps } from "../../pages/Details";

export const useMovieDetails = (details: IDetailsProps, bgColor: string) => {
	const { movie, trailerKey } = details;

	const navigate = useNavigate();
	const disclosure = useDisclosure();

	const voteInPercentage = (movie.vote_average * 10).toFixed(0);

	const handlePlayTrailer = () => {
		if (trailerKey) {
			disclosure.onOpen();
		} else {
			const queryMovieTitle = movie.title && movie?.title.replaceAll(" ", "+");
			window.open(
				`https://www.youtube.com/results?search_query=${queryMovieTitle}+Trailer+Oficial`,
			);
		}
	};

	const hasContrast = getContrast(bgColor, "#fff") < 3.5;
	const textColor = hasContrast ? "k-text-black" : "k-text-white";
	const voteColor = hasContrast ? "k-text-error" : "k-text-white";
	const borderColor = hasContrast ? "k-border-black" : "k-border-white";

	return {
		voteInPercentage,
		handlePlayTrailer,
		navigate,
		trailerKey,
		movie,
		textColor,
		borderColor,
		voteColor,
		disclosure,
	};
};
