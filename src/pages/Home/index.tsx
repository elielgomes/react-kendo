import React from "react";
import { Banner, Loading, Pagination } from "../../components";
import { useGetMovies } from "../../hooks/use-get-movies";
import { GridMovieCards } from "../../layout";
import { GetTopMovieList } from "../../providers/api.provider";

export const Home: React.FC = () => {
	const { movies, loading, highlightMovie, currentPage, handlePagination } = useGetMovies({
		callback: GetTopMovieList,
	});

	return loading ? (
		<Loading />
	) : (
		<main className="k-w-full k-pb-24">
			{highlightMovie && <Banner movie={highlightMovie} bgColorLoad="#000" />}
			<section className="container k-pt-24">
				<GridMovieCards movies={movies} />
				<div className="k-d-flex k-justify-content-center k-py-24">
					<Pagination changePage={handlePagination} currentPage={currentPage} />
				</div>
			</section>
		</main>
	);
};
