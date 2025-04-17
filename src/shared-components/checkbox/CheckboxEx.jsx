import {
	Checkbox,
	FormControlLabel,
	FormHelperText
} from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const CheckboxEx = memo(
	forwardRef((props, ref) => {
		const { label, slotProps, error, helperText, ...rest } = props;
		const { label: labelProps, ...checkboxSlotProps } = slotProps || {};

		const checkbox = (
			<Checkbox
				ref={ref}
				color="default"
				// {...(checkboxSlotProps && {
				// 	slotProps: checkboxSlotProps
				// })}
				{...checkboxSlotProps}
				{...rest}
			/>
		)

		return (
			<Box>
				{label ? <FormControlLabel
					label={label}
					error={error}
					control={
						checkbox
					}
					{...(labelProps && {
						slotProps: labelProps
					})}

				/> : (checkbox)}
				{helperText && (
					<FormHelperText error={!!error}>
						{helperText}
					</FormHelperText>
				)}
			</Box>
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
