import {
	FormGroup,
	FormControlLabel,
	Switch,
	FormHelperText,
	alpha,
} from "@mui/material";
import React from "react";
import { useMemo } from "react";
import { forwardRef } from "react";
import { memo } from "react";

/**
 * 新增 color 屬性
 * @param {*} param0
 * @returns
 */
const SwitchEx = memo(
	forwardRef((props, ref) => {
		const {
			label = "",
			checkedLabel,
			error,
			helperText,
			checked,
			onChange,
			color,
			...rest
		} = props;

		const controledLabel = useMemo(
			() => (checked ? checkedLabel || label : label),
			[checked, checkedLabel, label]
		);

		return (
			<FormGroup>
				<FormControlLabel
					label={controledLabel}
					error={error}
					control={
						<Switch
							ref={ref}
							checked={checked}
							onChange={onChange}
							sx={[
								(theme) => ({
									...(color && {
										"& .MuiSwitch-switchBase.Mui-checked": {
											color: color,
											"&:hover": {
												backgroundColor: alpha(
													color,
													theme.palette.action
														.hoverOpacity
												),
											},
										},
										"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
											{
												backgroundColor: color,
											},
									}),
								}),
							]}
							{...rest}
						/>
					}
				/>
				{helperText && (
					<FormHelperText error={!!error}>
						{helperText}
					</FormHelperText>
				)}
			</FormGroup>
		);
	})
);

export default SwitchEx;
