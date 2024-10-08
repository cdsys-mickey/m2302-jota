import { ListSubheader, Typography } from "@mui/material";
import { useCallback, useState } from "react";

const LISTBOX_PADDING = 8; // px

export const useOptionPicker = () => {
	const renderRow = useCallback((opts) => {
		// Props from React Window
		const { data, index, style } = opts;

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
				{optionLabel}
			</Typography>
		);
	}, []);

	return {
		renderRow,
	};
};
