import React from "react";
import { MoviesDataGrid } from "../../components/MoviesDataGrid";

export const All: React.FC = () => (
	<main className="k-min-h-screen k-d-flex k-align-items-center">
		<section className="container k-pt-12">
			<MoviesDataGrid />
		</section>
	</main>
);
