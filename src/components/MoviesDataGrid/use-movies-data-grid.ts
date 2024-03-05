import {
	CompositeFilterDescriptor,
	DataResult,
	FilterDescriptor,
	SortDescriptor,
	filterBy,
	orderBy,
} from "@progress/kendo-data-query";
import {
	GridFilterChangeEvent,
	GridPageChangeEvent,
	GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import React, { useEffect } from "react";
import { useDebounce } from "../../hooks/use-debounce";
import { IGenreList } from "../../interfaces";
import {
	GetGenreList,
	GetPopularMovieList,
	GetSearchMovies,
} from "../../providers/api.provider";
import { joinGenresWithMovies } from "../../utils/join-genres-movies";

interface PageState {
	skip: number;
	take: number;
}

const initialSort: SortDescriptor[] = [{ field: "ProductName", dir: "asc" }];

const initialDataState: PageState = { skip: 0, take: 20 };

export const useMoviesDataGrid = () => {
	const [sort, setSort] = React.useState(initialSort);
	const [page, setPage] = React.useState<PageState>(initialDataState);
	const [filter, setFilter] = React.useState<CompositeFilterDescriptor>();
	const [allGenres, setAllGenres] = React.useState<IGenreList | null>(null);
	const [movies, setMovies] = React.useState<DataResult>({ data: [], total: 0 });
	const [auxData, setAuxData] = React.useState<DataResult>({ data: [], total: 0 });
	const [searchInput, setSearchInput] = React.useState<string>("");
	const debounceValue: string = useDebounce(searchInput, 1000);

	const fetchData = async (pageNumber: number) => {
		try {
			const genreList = await GetGenreList();
			const moviesList = await GetPopularMovieList(pageNumber);

			const dataResult: DataResult = {
				data: joinGenresWithMovies(moviesList, genreList).results.map((movie) => ({
					id: movie.id,
					title: movie.title,
					genres: movie.genres.map((genre) => genre.name).join(", "),
					releaseDate: new Date(movie.release_date).getFullYear(),
					voteAverage: movie.vote_average.toFixed(1),
					genre: movie.genres[0].name || "Sem gênero",
				})),
				total: moviesList.total_results,
			};
			setAuxData(dataResult);
			setMovies(dataResult);
			setAllGenres(genreList);
		} catch (error) {
			console.error(error);
		}
	};

	const fetchSerachData = async (title: string, pageNumber: number) => {
		try {
			const genreList = await GetGenreList();
			const moviesList = await GetSearchMovies(title, pageNumber);

			const dataResult: DataResult = {
				data: joinGenresWithMovies(moviesList, genreList).results.map((movie) => ({
					id: movie.id,
					title: movie.title,
					genres: movie.genres,
					releaseDate: new Date(movie.release_date).getFullYear(),
					voteAverage: movie.vote_average.toFixed(1),
					genre: movie.genres[0] ? movie.genres[0].name : "Sem gênero",
				})),
				total: moviesList.total_results,
			};
			setAuxData(dataResult);
			setMovies(dataResult);
			setAllGenres(genreList);
		} catch (error) {
			console.error(error);
		}
	};

	const filterChange = async (event: GridFilterChangeEvent) => {
		setFilter(event.filter);
		if (!event.filter) {
			setAuxData(movies);
			setSearchInput("");
			return;
		}

		const filters = event.filter.filters as FilterDescriptor[];
		const title = filters.find((f) => f.field === "title")?.value as string | undefined;
		const genre = filters.find((f) => f.field === "genre")?.value as string | undefined;

		setSearchInput(title || "");

		setAuxData({
			data: movies ? filterBy(movies?.data, event.filter) : [],
			total: movies ? filterBy(movies?.data, event.filter).length : 0,
		});

		if (title && !genre) {
			setAuxData({
				data: movies.data,
				total: movies.total,
			});
		}
	};

	const pageChange = (event: GridPageChangeEvent) => {
		setPage({
			...event.page,
		});
	};

	const sortChange = (event: GridSortChangeEvent) => {
		setSort(event.sort);
		if (!event.sort) {
			setAuxData(movies);
			return;
		}
		setAuxData({
			data: movies ? orderBy(movies?.data, event.sort) : [],
			total: movies ? orderBy(movies?.data, event.sort).length : 0,
		});
	};

	useEffect(() => {
		if (!debounceValue || !debounceValue.trim()) {
			fetchData(page.skip / page.take + 1);
			return;
		}
		fetchSerachData(debounceValue, page.skip / page.take + 1);
	}, [debounceValue, page]);

	return {
		allGenres,
		auxData,
		filter,
		page,
		sort,
		filterChange,
		pageChange,
		sortChange,
	};
};
