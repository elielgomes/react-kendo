import { GridCustomCellProps } from "@progress/kendo-react-grid";
import { Rating } from "@progress/kendo-react-inputs";

export const RatingCell = (props: GridCustomCellProps) => {
	const field = "voteAverage" || "";
	const value = Math.floor(Number(props.dataItem[field]) / 2);
	if (props.rowType === "groupHeader") {
		return null;
	}
	return (
		<td {...props.tdProps}>
			<Rating value={value === null ? undefined : value} readonly />{" "}
		</td>
	);
};
