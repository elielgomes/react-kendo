import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";

export interface ISearchInput {
	searchInput: string;
	setSearchInput: Dispatch<SetStateAction<string>>;
}

export const SearchInputContext = createContext({} as ISearchInput);

export const SearchInputProvider = ({ children }: { children: ReactNode }) => {
	const [searchInput, setSearchInput] = useState<string>("");
	return (
		<SearchInputContext.Provider value={{ searchInput, setSearchInput }}>
			{children}
		</SearchInputContext.Provider>
	);
};
