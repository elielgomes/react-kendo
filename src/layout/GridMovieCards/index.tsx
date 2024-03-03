import { GridLayout, GridLayoutItem } from "@progress/kendo-react-layout";
import React from "react";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components";
import { IMovieList } from "../../interfaces";
import "./style.scss";

interface IGridMovieCardsProps {
	movies: IMovieList | null;
}

export const GridMovieCards: React.FC<IGridMovieCardsProps> = ({ movies }) => (
	<GridLayout
		className="custom-grid-layout k-w-fit k-mx-auto"
		cols={[{ width: 210 }, { width: 210 }, { width: 210 }, { width: 210 }]}
		gap={{ rows: 80, cols: 30 }}
	>
		{movies?.results.map((item) => (
			<GridLayoutItem
				key={item.id}
				className="k-d-flex k-justify-content-center k-align-items-center"
			>
				<Link to={`/details/${item.id}`}>
					<MovieCard movie={item} color="#1e1e1e" />
				</Link>
			</GridLayoutItem>
		))}
	</GridLayout>
);
