import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import brand from "../../assets/img/DEVFLIX-brand-sm.png";
import { SearchInputContext } from "../../contexts/search-input.context";
import { useDebounce } from "../../hooks/use-debounce";
import "./style.scss";

export const Navbar: React.FC = () => {
	const navigate = useNavigate();
	const { searchInput, setSearchInput } = useContext(SearchInputContext);
	const debounceValue: string = useDebounce(searchInput, 2000);

	useEffect(() => {
		if (!debounceValue || !debounceValue.trim()) {
			return;
		}
		navigate(`/search?q=${debounceValue}`);
		setSearchInput("");
	}, [debounceValue]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(event.target.value);
	};

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
