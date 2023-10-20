import React from "react";
import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@mui/material";

const CheckboxEx = ({ label, error, helperText, InputProps, ...rest }) => {
	return (
		<FormGroup
			sx={[
				(theme) => ({
					"& .MuiFormControlLabel-label": {
						whiteSpace: "noWrap",
					},
				}),
			]}>
			<FormControlLabel
				label={label}
				error={error}
				control={<Checkbox color="default" {...rest} />}
			/>
			{helperText && (
				<FormHelperText error={!!error}>{helperText}</FormHelperText>
			)}
		</FormGroup>
	);
};

export default React.memo(CheckboxEx);
