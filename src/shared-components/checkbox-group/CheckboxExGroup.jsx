import {
	Box,
	FormControl,
	FormGroup,
	FormHelperText,
	FormLabel,
} from "@mui/material";
import PropTypes from "prop-types";
import { memo, useState } from "react";
import { useController } from "react-hook-form";
import CheckboxEx from "../checkbox/CheckboxEx";

import ErrorBox from "../ErrorBox";
import LoadingTypography from "../LoadingTypography";
import { useCallback } from "react";
import { useScrollable } from "../../shared-hooks/useScrollable";

const defaultGetOptionKey = (option) => {
	return option;
};

const defaultGetOptionLabel = (option) => {
	return option;
};

const defaultIsOptionChecked = (option, value) => {
	return value.includes(option);
};

const CheckboxExGroup = memo((props) => {
	const {
		// Basic
		height = 300,
		options = [],
		control,
		name,
		label,
		sx = [],
		getOptionKey = defaultGetOptionKey,
		getOptionLabel = defaultGetOptionLabel,
		isOptionChecked = defaultIsOptionChecked,
		loading,
		error,
		rules,
		CheckboxExProps,
		...rest
	} = props;

	const scrollable = useScrollable({ height: height });

	const { field, fieldState } = useController({
		name,
		control,
		defaultValue: [],
		rules,
	});

	// const [value, setValue] = useState(field.value || []);

	const handleChange = useCallback(
		(e) => {
			const valueCopy = e.target.checked
				? [...field.value, e.target.value]
				: field.value.filter((item) => item !== e.target.value);
			field.onChange(valueCopy);
			// setValue(valueCopy);
		},
		[field]
	);

	if (loading === null || loading === undefined) {
		return false;
	}

	if (loading) {
		return <LoadingTypography>讀取中...</LoadingTypography>;
	}

	return (
		<FormControl
			component="fieldset"
			sx={[
				() => ({
					"& .MuiFormControlLabel-label": {
						whiteSpace: "noWrap",
					},
				}),
				...(Array.isArray(sx) ? sx : [sx]),
			]}
			{...rest}>
			{label && <FormLabel component="legend">{label}</FormLabel>}
			<Box
				pl={1}
				sx={[
					scrollable.scroller,
					{
						backgroundColor: "rgb(0,0,0,0.05)",
					},
				]}>
				{error && <ErrorBox error={error} />}
				{loading === false && (
					<FormGroup>
						{options?.map((option) => {
							return (
								<CheckboxEx
									label={getOptionLabel(option)}
									key={getOptionKey(option)}
									checked={isOptionChecked(
										option,
										field.value
									)}
									value={getOptionKey(option)}
									onChange={handleChange}
									{...CheckboxExProps}
								/>
							);
						})}
					</FormGroup>
				)}
			</Box>
			<Box mt={1}>
				{fieldState.error && (
					<FormHelperText error>
						*{fieldState.error?.message}
					</FormHelperText>
				)}
			</Box>
		</FormControl>
	);
});

CheckboxExGroup.propTypes = {
	name: PropTypes.string.isRequired,
	label: PropTypes.string,
	variant: PropTypes.string,
	options: PropTypes.array,
	control: PropTypes.object,
	CheckboxExProps: PropTypes.object,
	getOptionKey: PropTypes.func,
	getOptionLabel: PropTypes.func,
	isOptionChecked: PropTypes.func,
	getData: PropTypes.func,
	sx: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
	loading: PropTypes.bool,
	error: PropTypes.object,
	height: PropTypes.number,
};

CheckboxExGroup.displayName = "CheckboxExGroup";
export default CheckboxExGroup;
