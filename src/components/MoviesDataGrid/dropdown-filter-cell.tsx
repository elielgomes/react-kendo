import { Button } from "@progress/kendo-react-buttons";
import { DropDownList, DropDownListChangeEvent } from "@progress/kendo-react-dropdowns";
import { GridFilterCellProps } from "@progress/kendo-react-grid";

interface DropdownFilterCellProps extends GridFilterCellProps {
	defaultItem: string;
	data: string[];
}

export const DropdownFilterCell = (props: DropdownFilterCellProps) => {
	let hasValue: any = (value: string) => Boolean(value && value !== props.defaultItem);

	const onChange = (event: DropDownListChangeEvent) => {
		hasValue = hasValue(event.target.value);
		props.onChange({
			value: hasValue ? event.target.value : "",
			operator: hasValue ? "eq" : "",
			syntheticEvent: event.syntheticEvent,
		});
	};

	const onClearButtonClick = (event: any) => {
		event.preventDefault();
		props.onChange({
			value: "",
			operator: "",
			syntheticEvent: event,
		});
	};
	return (
		<div className="k-filtercell k-gap-1">
			<DropDownList
				data={props.data}
				onChange={onChange}
				value={props.value || props.defaultItem}
				defaultItem={props.defaultItem}
			/>
			<Button title="Clear" disabled={!hasValue(props.value)} onClick={onClearButtonClick}>
				<span
					className="k-icon k-svg-icon k-svg-i-filter-clear k-button-icon"
					aria-hidden="true"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="m143.5 64 168.2 168.2L288 256v160l-64 64V256L64 96V64zm236.1 100.4L448 96V64H279.3l-64-64L192 22l298 298 22-23.3z" />
					</svg>
				</span>
			</Button>
		</div>
	);
};
