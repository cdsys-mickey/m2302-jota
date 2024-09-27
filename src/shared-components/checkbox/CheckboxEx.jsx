import {
	Checkbox,
	FormControlLabel,
	FormHelperText
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const CheckboxEx = memo(
	forwardRef((props, ref) => {
		const { label, labelSlotProps, error, helperText, ...rest } = props;
		return (
			<>
				<FormControlLabel
					label={label}
					error={error}
					control={<Checkbox ref={ref} color="default" {...rest} />}
					slotProps={labelSlotProps}
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
	labelSlotProps: PropTypes.object,
	error: PropTypes.object,
	helperText: PropTypes.string,
};
export default CheckboxEx;
