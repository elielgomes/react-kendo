/* eslint-disable react/jsx-max-props-per-line */
import {
	Grid,
	GridColumn,
	GridFilterCellProps,
	GridFilterOperators,
} from "@progress/kendo-react-grid";
import { DropdownFilterCell } from "./dropdown-filter-cell";
import { RatingCell } from "./rating-cell";
import "./style.scss";
import { useMoviesDataGrid } from "./use-movies-data-grid";

interface ICategoryFilterProps extends GridFilterCellProps {
	data: string[];
}

const CategoryFilterCell = (props: ICategoryFilterProps) => (
	<DropdownFilterCell {...props} data={props.data} defaultItem="Selecione um gênero" />
);

const filterOperators: GridFilterOperators = {
	text: [{ text: "grid.filterContainsOperator", operator: "contains" }],
	numeric: [{ text: "grid.filterEqOperator", operator: "eq" }],
	date: [{ text: "grid.filterEqOperator", operator: "eq" }],
	boolean: [{ text: "grid.filterEqOperator", operator: "eq" }],
};

export const MoviesDataGrid = () => {
	const {
		allGenres,
		auxData,
		filter,
		page,
		sort,
		filterChange,
		pageChange,
		sortChange,
	} = useMoviesDataGrid();

	return (
		<Grid
			className="k-rounded-lg k-overflow-hidden k-w-full"
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
			<GridColumn field="id" title="ID" width={100} filterable={false} />
			<GridColumn field="title" title="Nome" width={420} />
			<GridColumn
				width={310}
				field="genre"
				title="Gênero"
				filterCell={(e) => (
					<CategoryFilterCell {...e} data={allGenres?.genres.map((g) => g.name) || []} />
				)}
			/>
			<GridColumn
				field="releaseDate"
				filterable={false}
				title="Ano de lançamento"
				width={180}
			/>
			<GridColumn
				width={240}
				field="voteAverage"
				title="Avaliação"
				filterable={false}
				cells={{ data: RatingCell }}
			/>
		</Grid>
	);
};
