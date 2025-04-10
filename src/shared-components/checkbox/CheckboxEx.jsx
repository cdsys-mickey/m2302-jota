import {
	Checkbox,
	FormControlLabel,
	FormHelperText
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const CheckboxEx = memo(
	forwardRef((props, ref) => {
		const { label, slotProps, error, helperText, ...rest } = props;
		const { label: labelProps, ...checkboxSlotProps } = slotProps || {};
		return (
			<>
				<FormControlLabel
					label={label}
					error={error}
					control={<Checkbox ref={ref} color="default" slotProps={checkboxSlotProps} {...rest} />}
					{...labelProps}
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
	slotProps: PropTypes.object,
	error: PropTypes.object,
	helperText: PropTypes.string,
};
export default CheckboxEx;
