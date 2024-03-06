import {
	GetGenreList,
	GetMovie,
	GetPopularMovieList,
	GetSearchMovies,
	GetTrailer,
} from "./api.provider";

describe("Api provider", () => {
	it("should be able to return a list of 20 movies", async () => {
		const response = GetPopularMovieList(1);

		expect((await response).results).toBeDefined();
		expect((await response).results.length).toBe(20);
	});

	it("should be able to return a list of genres", async () => {
		const response = GetGenreList();

		expect((await response).genres).toBeDefined();
		expect((await response).genres.length).toBeGreaterThan(0);
	});

	it("should be able to return one movie by id", async () => {
		const response = GetMovie("940551");

		expect(await response).toBeDefined();
		expect((await response).title).toBeTruthy();
		expect((await response).id).toBe(940551);
		expect((await response).genres.length).toBeGreaterThan(0);
	});

	it("should be able to return a list of Batman related movies", async () => {
		const response = GetSearchMovies("batman", 1);

		expect((await response).results).toBeDefined();
		expect((await response).results.length).toBe(20);
	});

	it("should be able to return a movie trailer by id", async () => {
		const response = GetTrailer("940551");

		expect(Array.isArray((await response).results)).toBe(true);
		expect((await response).results.length).toBeGreaterThan(0);
		expect((await response).results[0].key).toBeTruthy();
	});
});
