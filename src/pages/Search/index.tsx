import React from "react";
import { FaSearch } from "react-icons/fa";
import { GridMovieCards } from "../../layout";

import { FloatButtonHome, Loading } from "../../components";
import { useSearch } from "./use-search";

export const Search: React.FC = () => {
	const { movies, query, loading } = useSearch();

	return loading ? (
		<Loading />
	) : (
		<>
			<FloatButtonHome />
			<main className="container k-pb-24">
				<section className="k-pt-24">
					<h1 className="k-pt-24 k-mb-12 k-text-xl k-text-center k-text-secondary k-d-flex k-align-items-center k-justify-content-center">
						<FaSearch size={40} className="k-pr-4" />
						{movies?.results.length !== 0
							? `Resultados para: ${query}`
							: `Nenhum resultado para: ${query}`}
					</h1>
					<GridMovieCards movies={movies} />
				</section>
			</main>
		</>
	);
};
