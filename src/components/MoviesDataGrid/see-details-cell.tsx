import { GridCustomCellProps } from "@progress/kendo-react-grid";
import { Link } from "react-router-dom";

export const SeeDetails = (props: GridCustomCellProps) => {
	if (props.rowType === "groupHeader") {
		return null;
	}
	return (
		<td {...props.tdProps} className="title-cell">
			<Link className="hover-title-grid" to={`/details/${props.dataItem["id" || ""]}`}>
				{props.dataItem["title" || ""]}
			</Link>
		</td>
	);
};
