import { useEffect, useState } from "react";
import useImageColor from "use-image-color";
import { GetMovie, GetTrailer } from "../../providers/api-provider";
import { getUrlBackdropImage } from "../../utils/get-url-images";
import { IDetailsProps } from "./";

export const useDetails = (id: string) => {
	const [details, setDetails] = useState<IDetailsProps | null>(null);

	const getData = async () => {
		try {
			const [resMovie, resTrailer] = await Promise.all([
				GetMovie(id || ""),
				GetTrailer(id || ""),
			]);
			setDetails({ trailerKey: resTrailer.results[0]?.key, movie: resMovie });
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getData();
	}, [id]);

	const { colors } = useImageColor(
		details?.movie.poster_path && getUrlBackdropImage(details.movie?.poster_path),
		{ cors: true, colors: 4 },
	);

	const movieImageBackdropUrl =
		details?.movie.backdrop_path && getUrlBackdropImage(details.movie.backdrop_path);
	const movieImagePosterUrl =
		details?.movie.poster_path && getUrlBackdropImage(details.movie.poster_path);

	const color = colors ? colors[0] : "#000";
	return {
		details,
		color,
		movieImageBackdropUrl,
		movieImagePosterUrl,
	};
};
