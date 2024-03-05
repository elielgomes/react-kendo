import { GridCustomCellProps } from "@progress/kendo-react-grid";

export const SeeDetails = (props: GridCustomCellProps) => {
	if (props.rowType === "groupHeader") {
		return null;
	}
	return (
		<td {...props.tdProps} className="title-cell">
			<a className="hover-title-grid" href={`/details/${props.dataItem["id" || ""]}`}>
				{props.dataItem["title" || ""]}
			</a>
		</td>
	);
};
