/* eslint-disable react/jsx-max-props-per-line */

import { CompositeFilterDescriptor, DataResult, filterBy } from "@progress/kendo-data-query";
import {
	Grid,
	GridColumn,
	GridFilterCellProps,
	GridFilterChangeEvent,
	GridFilterOperators,
	GridPageChangeEvent,
} from "@progress/kendo-react-grid";
import React, { useEffect } from "react";
import { IGenreList } from "../../interfaces";
import { GetGenreList, GetTopMovieList } from "../../providers/api.provider";
import { joinGenresWithMovies } from "../../utils/join-genres-movies";
import { Loading } from "../Loading";
import { DropdownFilterCell } from "./dropdown-filter-cell";

interface ICategoryFilterProps extends GridFilterCellProps {
	data: string[];
}

const CategoryFilterCell = (props: ICategoryFilterProps) => (
	<DropdownFilterCell {...props} data={props.data} defaultItem="Select category" />
);

const filterOperators: GridFilterOperators = {
	text: [{ text: "grid.filterContainsOperator", operator: "contains" }],
	numeric: [{ text: "grid.filterEqOperator", operator: "eq" }],
	date: [{ text: "grid.filterEqOperator", operator: "eq" }],
	boolean: [{ text: "grid.filterEqOperator", operator: "eq" }],
};

interface PageState {
	skip: number;
	take: number;
}

const initialDataState: PageState = { skip: 0, take: 20 };

export const MoviesDataGrid = () => {
	const [loading, setLoading] = React.useState(false);
	const [allGenres, setAllGenres] = React.useState<IGenreList | null>(null);
	const [movies, setMovies] = React.useState<DataResult>({ data: [], total: 0 });
	const [auxData, setAuxData] = React.useState<DataResult>({ data: [], total: 0 });
	const [filter, setFilter] = React.useState<CompositeFilterDescriptor>();
	const [page, setPage] = React.useState<PageState>(initialDataState);

	const fetchData = async (page: number) => {
		setLoading(true);
		try {
			const genreList = await GetGenreList();
			const moviesList = await GetTopMovieList(page);

			const dataResult: DataResult = {
				data: joinGenresWithMovies(moviesList, genreList).results.map((movie) => ({
					id: movie.id,
					title: movie.title,
					genres: movie.genres.map((genre) => genre.name).join(", "),
					releaseDate: new Date(movie.release_date).toLocaleDateString("pt-BR"),
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
		} finally {
			setLoading(false);
		}
	};

	const filterChange = (event: GridFilterChangeEvent) => {
		setFilter(event.filter);
		if (!event.filter) {
			setAuxData(movies);
			return;
		}
		setAuxData({
			data: movies ? filterBy(movies?.data, event.filter) : [],
			total: movies ? filterBy(movies?.data, event.filter).length : 0,
		});
	};

	const pageChange = (event: GridPageChangeEvent) => {
		console.log(event.page.skip / event.page.take + 1);
		setPage({
			...event.page,
		});
	};

	useEffect(() => {
		fetchData(page.skip / page.take + 1);
	}, [page]);

	return loading ? (
		<div className="k-w-full">
			<Loading />
		</div>
	) : (
		<Grid
			style={{ height: "500px" }}
			data={auxData}
			filterable
			filter={filter}
			skip={page.skip}
			take={page.take}
			total={auxData.total}
			pageable={{
				buttonCount: 4,
			}}
			onFilterChange={filterChange}
			filterOperators={filterOperators}
			pageSize={20}
			onPageChange={pageChange}
		>
			<GridColumn field="id" title="ID" width="140px" filterable={false} />
			<GridColumn field="title" title="Nome" width="250px" />
			<GridColumn field="releaseDate" filter="text" title="Lançamento" />
			<GridColumn field="voteAverage" filter="text" title="Avaliação" />
			<GridColumn
				field="genre"
				title="Gênero"
				filterCell={(e) => (
					<CategoryFilterCell {...e} data={allGenres?.genres.map((g) => g.name) || []} />
				)}
			/>
		</Grid>
	);
};
