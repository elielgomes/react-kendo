import React from "react";
import { Banner, Loading } from "../../components";
import { useGetMovies } from "../../hooks/use-get-movies";
import { GridMovieCards } from "../../layout";
import { GetTopMovieList } from "../../providers/api.provider";

export const Home: React.FC = () => {
	const { movies, loading, highlightMovie } = useGetMovies({
		callback: GetTopMovieList,
	});

	return loading ? (
		<Loading />
	) : (
		<main className="k-w-full k-pb-24">
			{highlightMovie && <Banner movie={highlightMovie} bgColorLoad="#000" />}
			<section className="container k-pt-24">
				<GridMovieCards movies={movies} />
			</section>
		</main>
	);
};
