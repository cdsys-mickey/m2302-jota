import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import RWListboxComponent from "./RWListboxComponent";
import { ListSubheader, Typography } from "@mui/material";

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
	// Props from React Window
	const { data, index, style } = props;

	// Props from Autocomplete-renderOption
	const dataSet = data[index];

	const componentProps = dataSet[0];
	const optionLabel = dataSet[1];

	const inlineStyle = {
		...style,
		top: style.top + LISTBOX_PADDING,
	};

	if (dataSet.group !== undefined) {
		return (
			<ListSubheader
				key={dataSet.key}
				component="div"
				style={inlineStyle}>
				{dataSet.group}
			</ListSubheader>
		);
	}

	return (
		<Typography
			component="li"
			{...componentProps}
			noWrap
			style={inlineStyle}>
			B{optionLabel}
		</Typography>
	);
}

export const RWListboxComponent2 = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;
		return (
			<RWListboxComponent ref={ref} renderRow={renderRow} {...rest}>
				{children}
			</RWListboxComponent>
		);
	})
);

RWListboxComponent2.propTypes = {};

RWListboxComponent2.displayName = "RWListboxComponent2";