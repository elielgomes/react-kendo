import axios from "axios";
import { IGenreList, IMovie, IMovieList, ITrailer } from "../interfaces";
const apiKey = process.env.REACT_APP_API_KEY;

export const GetTrailer = async (id: string) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=pt-br`,
	);
	const data: ITrailer = await response.data;
	return data;
};

export const GetGenreList = async () => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=pt-br`,
	);
	const data: IGenreList = await response.data;
	return data;
};

export const GetSearchMovies = async (query: string, page: number) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&include_adult=false&language=pt-br&page=${page}`,
	);
	const data: IMovieList = await response.data;
	return data;
};

export const GetMovie = async (id: string) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-br`,
	);
	const data: IMovie = await response.data;
	return data;
};

export const GetPopularMovieList = async (page: number) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-br&page=${page}`,
	);
	const data: IMovieList = await response.data;
	return data;
};

export const GetTopMovieList = async (page: number) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-br&page=${page}`,
	);
	const data: IMovieList = await response.data;
	return data;
};

export const GetUpcomingMovieList = async (page: number) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-br&page=${page}`,
	);
	const data: IMovieList = await response.data;
	return data;
};
