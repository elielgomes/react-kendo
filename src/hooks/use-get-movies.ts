import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovie, IMovieList } from "../interfaces";
import { GetGenreList } from "../providers/api.provider";
import { joinGenresWithMovies } from "../utils/join-genres-movies";
import { startScrollTop } from "../utils/start-scroll-top";

interface IUseGetMoviesParams {
	callback: (page: number) => Promise<IMovieList>;
}

export const useGetMovies = ({ callback }: IUseGetMoviesParams) => {
	const [params] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [movies, setMovies] = useState<IMovieList | null>(null);
	const [loading, setLoading] = useState(false);
	const [highlightMovie, setHighlightMovie] = useState<IMovie | null>(null);

	const randomIndex = (results: number) => Math.floor(Math.random() * results);

	const fetchData = async (page: number) => {
		setLoading(true);
		try {
			const genres = await GetGenreList();
			const moviesList = await callback(page);
			setMovies(joinGenresWithMovies(moviesList, genres));
			const highlight = moviesList.results[randomIndex(19)];
			setHighlightMovie(highlight.backdrop_path ? highlight : moviesList.results[0]);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	const handlePagination = (page: number) => {
		setCurrentPage(page);
		params.set("page", page.toString());
		window.history.pushState({}, "", `?${params.toString()}`);
	};

	useEffect(() => {
		startScrollTop();

		const pageParam = Number(params.get("page")) || 1;
		if (isNaN(pageParam) || pageParam <= 0) {
			window.location.href = "/";
			return;
		}
		setCurrentPage(pageParam);
	}, [params]);

	useEffect(() => {
		fetchData(currentPage);
	}, [currentPage]);

	return { movies, loading, highlightMovie, handlePagination, currentPage };
};
