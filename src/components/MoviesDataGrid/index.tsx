/* eslint-disable react/jsx-max-props-per-line */

import {
	CompositeFilterDescriptor,
	DataResult,
	filterBy,
	orderBy,
	SortDescriptor,
} from "@progress/kendo-data-query";
import {
	Grid,
	GridColumn,
	GridCustomCellProps,
	GridFilterCellProps,
	GridFilterChangeEvent,
	GridFilterOperators,
	GridPageChangeEvent,
	GridSortChangeEvent,
} from "@progress/kendo-react-grid";
import { Rating } from "@progress/kendo-react-inputs";
import React, { useEffect } from "react";
import { IGenreList } from "../../interfaces";
import { GetGenreList, GetPopularMovieList } from "../../providers/api.provider";
import { joinGenresWithMovies } from "../../utils/join-genres-movies";
import { Loading } from "../Loading";
import { DropdownFilterCell } from "./dropdown-filter-cell";
import "./style.scss";

interface ICategoryFilterProps extends GridFilterCellProps {
	data: string[];
}

interface PageState {
	skip: number;
	take: number;
}

export const RatingCell = (props: GridCustomCellProps) => {
	const field = "voteAverage" || "";
	const value = Math.floor(Number(props.dataItem[field]) / 2);
	if (props.rowType === "groupHeader") {
		return null;
	}
	return (
		<td {...props.tdProps}>
			<Rating value={value === null ? undefined : value} readonly />{" "}
		</td>
	);
};

const CategoryFilterCell = (props: ICategoryFilterProps) => (
	<DropdownFilterCell {...props} data={props.data} defaultItem="Selecione um gênero" />
);

const filterOperators: GridFilterOperators = {
	text: [{ text: "grid.filterContainsOperator", operator: "contains" }],
	numeric: [{ text: "grid.filterEqOperator", operator: "eq" }],
	date: [{ text: "grid.filterEqOperator", operator: "eq" }],
	boolean: [{ text: "grid.filterEqOperator", operator: "eq" }],
};

const initialSort: SortDescriptor[] = [{ field: "ProductName", dir: "asc" }];

const initialDataState: PageState = { skip: 0, take: 20 };

export const MoviesDataGrid = () => {
	const [loading, setLoading] = React.useState(false);
	const [allGenres, setAllGenres] = React.useState<IGenreList | null>(null);
	const [movies, setMovies] = React.useState<DataResult>({ data: [], total: 0 });
	const [auxData, setAuxData] = React.useState<DataResult>({ data: [], total: 0 });
	const [filter, setFilter] = React.useState<CompositeFilterDescriptor>();
	const [page, setPage] = React.useState<PageState>(initialDataState);
	const [sort, setSort] = React.useState(initialSort);

	const fetchData = async (pageNumber: number) => {
		setLoading(true);
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
		fetchData(page.skip / page.take + 1);
	}, [page]);

	return loading ? (
		<div className="k-w-full">
			<Loading />
		</div>
	) : (
		<Grid
			// eslint-disable-next-line max-len
			className="k-rounded-lg k-overflow-hidden"
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
			sortable
			sort={sort}
			onSortChange={sortChange}
		>
			<GridColumn field="id" title="ID" width="140px" filterable={false} />
			<GridColumn field="title" title="Nome" width="250px" />
			<GridColumn
				field="genre"
				title="Gênero"
				filterCell={(e) => (
					<CategoryFilterCell {...e} data={allGenres?.genres.map((g) => g.name) || []} />
				)}
			/>
			<GridColumn field="releaseDate" filterable={false} title="Ano de lançamento" />
			<GridColumn
				field="voteAverage"
				title="Avaliação"
				filterable={false}
				cells={{ data: RatingCell }}
			/>
		</Grid>
	);
};
