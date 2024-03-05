import React from "react";
import notfoundImage from "../../assets/img/404.png";
import "./style.scss";

export const NotFound: React.FC = () => (
	<main className="container k-px-8 k-h-screen k-d-flex k-align-items-center k-justify-content-center">
		<div className="notfound-wrapper k-mt-8">
			<p className="k-font-size-xl text-primary k-text-center">Ooops...</p>
			<p className="text k-text-white k-text-center k-mb-2">Página não encontrada!</p>
			<img src={notfoundImage} alt="Not found" className="notfound-img" />
			<p className="k-text-white k-font-size-xl k-font-semibold k-text-center">
				PEGUE SUA PIPOCA E ASSISTA OS
				<br /> <strong className="text-primary">MELHORES</strong> FILMES
			</p>
			<a href="/" className="k-mt-3">
				Home
			</a>
		</div>
	</main>
);
