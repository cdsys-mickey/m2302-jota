import {
	Checkbox,
	FormControlLabel,
	FormGroup,
	FormHelperText,
} from "@mui/material";
import { forwardRef } from "react";
import { memo } from "react";
import PropTypes from "prop-types";

const CheckboxEx = memo(
	forwardRef((props, ref) => {
		const { label, error, helperText, ...rest } = props;
		return (
			<>
				<FormControlLabel
					label={label}
					error={error}
					control={<Checkbox ref={ref} color="default" {...rest} />}
				/>
				{helperText && (
					<FormHelperText error={!!error}>
						{helperText}
					</FormHelperText>
				)}
			</>
		);
	})
);
CheckboxEx.displayName = "CheckboxEx";
CheckboxEx.propTypes = {
	label: PropTypes.string,
	error: PropTypes.object,
	helperText: PropTypes.string,
};
export default CheckboxEx;
