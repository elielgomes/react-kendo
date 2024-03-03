import { getContrast } from "polished";
import React from "react";
import { Link } from "react-router-dom";
import { IMovie } from "../../interfaces";
import { getUrlBackdropImage } from "../../utils/get-url-images";
import brand from "./../../assets/img/BrandCircle.png";
import "./style.scss";

interface IBannerProps {
	movie: IMovie;
	bgColorLoad: string;
}

export const Banner: React.FC<IBannerProps> = ({ movie, bgColorLoad }) => {
	const hasContrast = getContrast(bgColorLoad, "#fff") < 3.5;
	const textColor = hasContrast ? "#000" : "#fff";

	return (
		movie && (
			<section
				className="banner"
				style={{
					backgroundImage: `linear-gradient(to bottom, transparent 0%, ${bgColorLoad} 100%), url(${getUrlBackdropImage(
						movie?.backdrop_path,
					)})`,
				}}
			>
				<img src={brand} alt="Brand" />
				<h1 className="title">DEVFLIX</h1>
				<div className="content-wrapper">
					{movie.title && (
						<p
							className="k-font-size-xl k-font-medium k-text-center k-px-4"
							style={{ color: textColor }}
						>
							{movie.title}
						</p>
					)}
					{movie.genres && (
						<p style={{ color: textColor }}>
							{movie.genres[0]?.name && movie.genres[0]?.name}
							{movie.genres[1]?.name && " | " + movie.genres[1]?.name}
						</p>
					)}
					<p className="k-text-center k-font-size-lg k-px-5" style={{ color: textColor }}>
						Watch Devflix movies & TV shows online or stream right to your smart TV, game
						console, PC, Mac, mobile, tablet and more.
					</p>
					<Link to={`/details/${movie?.id}`} style={{ textDecoration: "none" }}>
						<button className="k-cursor-pointer" style={{ color: textColor }}>
							WATCH NOW
						</button>
					</Link>
				</div>
			</section>
		)
	);
};
