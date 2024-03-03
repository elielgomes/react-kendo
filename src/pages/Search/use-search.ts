import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { IMovieList } from "../../interfaces";
import { GetGenreList, GetSearchMovies } from "../../providers/api.provider";
import { joinGenresWithMovies } from "../../utils/join-genres-movies";
import { startScrollTop } from "../../utils/start-scroll-top";

export const useSearch = () => {
	const [params] = useSearchParams();
	const [currentPage, setCurrentPage] = useState(1);
	const [movies, setMovies] = useState<IMovieList | null>(null);
	const [loading, setLoading] = useState(false);
	const query = params.get("q") || "";

	const fetchData = async (page: number, queryParam: string) => {
		setLoading(true);
		try {
			const genres = await GetGenreList();
			const moviesList = await GetSearchMovies(queryParam, page);
			setMovies(joinGenresWithMovies(moviesList, genres));
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

		document.title = `Buscar: ${query}`;

		const pageParam = Number(params.get("page")) || 1;
		if (isNaN(pageParam) || pageParam <= 0) {
			window.location.href = "/";
			return;
		}
		setCurrentPage(pageParam);

		return () => {
			document.title = "Devflix";
		};
	}, [params]);

	useEffect(() => {
		fetchData(currentPage, query);
	}, [currentPage]);

	return { movies, query, currentPage, loading, handlePagination };
};
