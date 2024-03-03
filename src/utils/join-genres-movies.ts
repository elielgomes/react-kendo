import { IGenreList, IMovieList } from "../interfaces";

export const joinGenresWithMovies = (movieList: IMovieList, genreList: IGenreList): IMovieList => {
	const moviesWithGenres = movieList.results.map((movie) => {
		const genres = genreList?.genres.filter((genre) => movie.genre_ids.includes(genre.id));
		movie.genres = genres || [];
		return movie;
	});

	return { ...movieList, results: moviesWithGenres };
};
