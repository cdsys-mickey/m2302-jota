import {
	FormGroup,
	FormControlLabel,
	Switch,
	FormHelperText,
	alpha,
} from "@mui/material";
import React from "react";

/**
 * 新增 color 屬性
 * @param {*} param0
 * @returns
 */
const SwitchEx = ({
	label,
	error,
	helperText,
	checked = false,
	onChange,
	color,
	...rest
}) => {
	return (
		<FormGroup>
			<FormControlLabel
				label={label}
				error={error}
				control={
					<Switch
						checked={checked}
						onChange={onChange}
						sx={[
							(theme) => ({
								"& .MuiSwitch-switchBase.Mui-checked": {
									color: color,
									"&:hover": {
										backgroundColor: alpha(
											color,
											theme.palette.action.hoverOpacity
										),
									},
								},
								"& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
									{
										backgroundColor: color,
									},
							}),
						]}
						{...rest}
					/>
				}
			/>
			{helperText && (
				<FormHelperText error={!!error}>{helperText}</FormHelperText>
			)}
		</FormGroup>
	);
};

export default React.memo(SwitchEx);
