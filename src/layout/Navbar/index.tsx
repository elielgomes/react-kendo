import React from "react";
import { Link } from "react-router-dom";
import brand from "../../assets/img/DEVFLIX-brand-sm.png";
import "./style.scss";
import { useNavbar } from "./use-navbar";

export const Navbar: React.FC = () => {
	const { searchInput, handleChange } = useNavbar();
	return (
		<header>
			<nav className="container k-px-4">
				<Link to="/" className="k-d-flex">
					<img src={brand} alt="Brand" className="brand" />
				</Link>
				<input
					type="text"
					className="search-input"
					placeholder="Buscar filmes..."
					value={searchInput}
					onChange={handleChange}
				/>
			</nav>
		</header>
	);
};
