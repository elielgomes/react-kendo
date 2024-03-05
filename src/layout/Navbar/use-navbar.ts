import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDebounce } from "../../hooks/use-debounce";

export const useNavbar = () => {
	const navigate = useNavigate();
	const [searchInput, setSearchInput] = useState<string>("");
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

	return {
		searchInput,
		handleChange,
	};
};
