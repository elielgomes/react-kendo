import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Navbar } from "../layout/Navbar";
import { All, Details, Home, NotFound, Search } from "../pages";

const App: React.FC = () => (
	<BrowserRouter>
		<Navbar />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/all" element={<All />} />
			<Route path="/search" element={<Search />} />
			<Route path="/details/:id" element={<Details />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</BrowserRouter>
);

export default App;
