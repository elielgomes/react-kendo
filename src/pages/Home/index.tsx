import { getContrast } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import { Banner, Loading, Pagination } from "../../components";
import { useGetMovies } from "../../hooks/use-get-movies";
import { useImageColor } from "../../hooks/use-image-color";
import { GridMovieCards } from "../../layout";
import { GetPopularMovieList } from "../../providers/api.provider";
import { getUrlBackdropImage } from "../../utils/get-url-images";

export const Home: React.FC = () => {
	const { movies, loading, highlightMovie, currentPage, handlePagination } = useGetMovies({
		callback: GetPopularMovieList,
	});

	const { colors } = useImageColor(
		highlightMovie?.poster_path ? getUrlBackdropImage(highlightMovie?.poster_path) : "",
		{ cors: true, colors: 4 },
	);
	const color = colors ? colors[0] : "#000";
	const hasContrast = getContrast(color, "#fff") < 3.5;
	const textColor = hasContrast ? "#000" : "#fff";

	return loading ? (
		<Loading />
	) : (
		<main className="k-w-full k-h-full k-pb-24" style={{ backgroundColor: color }}>
			{highlightMovie && (
				<Banner movie={highlightMovie} textColor={textColor} bgColorLoad={color} />
			)}
			<section className="container k-pt-24">
				<div
					data-aos="fade-left"
					className="k-d-flex k-justify-content-between k-align-items-center k-px-3 k-py-8"
				>
					<h1 className="k-font-size-xl" style={{ color: textColor }}>
						Mais populares
					</h1>
					<Link to="/all" className="default k-link k-text-white">
						Ver todos
					</Link>
				</div>
				<GridMovieCards movies={movies} themeColor={colors ? colors[0] : "#1e1e1e"} />
				<div className="k-d-flex k-justify-content-center k-py-24">
					<Pagination changePage={handlePagination} currentPage={currentPage} />
				</div>
			</section>
		</main>
	);
};
