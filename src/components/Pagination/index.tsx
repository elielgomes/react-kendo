import React from "react";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import "./style.scss";

interface IPaginationProps {
	changePage: (page: number) => void;
	currentPage: number;
	maxPage?: number;
}

export const Pagination: React.FC<IPaginationProps> = ({
	changePage,
	currentPage,
	maxPage = 500,
}) => (
	<div className="k-d-flex k-gap-8 k-align-items-center">
		{currentPage >= 2 && (
			<button className="btn-pagination" onClick={() => changePage(currentPage - 3)}>
				<FaAngleDoubleLeft />
			</button>
		)}
		<button className="btn-pagination active">{currentPage}</button>
		{currentPage <= maxPage - 1 && (
			<button className="btn-pagination" onClick={() => changePage(currentPage + 1)}>
				{currentPage + 1}
			</button>
		)}
		{currentPage <= maxPage - 2 && (
			<button className="btn-pagination" onClick={() => changePage(currentPage + 2)}>
				{currentPage + 2}
			</button>
		)}
		{currentPage <= maxPage - 3 && (
			<button className="btn-pagination" onClick={() => changePage(currentPage + 3)}>
				<FaAngleDoubleRight />
			</button>
		)}
	</div>
);
