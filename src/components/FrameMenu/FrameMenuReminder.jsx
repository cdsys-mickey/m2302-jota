import { FlexBox } from "shared-components";
import MuiStyles from "@/shared-modules/MuiStyles";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import Colors from "@/modules/Colors.mjs";
import { AlertEx } from "shared-components";

export const FrameMenuReminder = memo(
	forwardRef((props, ref) => {
		const {
			label,
			variant = "h6",
			dense = false,
			sx = [],
			severity = "info",
			...rest
		} = props;
		return (
			<FlexBox
				ref={ref}
				inline
				fullWidth
				alignItems="center"
				pt="2px"
				pl={0.5}
				sx={[
					{
						height: dense ? "26px" : "34px",
					},
					...(Array.isArray(sx) ? sx : [sx]),
					MuiStyles.ELLIPSIS,
				]}
				{...rest}>
				<AlertEx severity={severity} transparent >
					{label}
				</AlertEx>

			</FlexBox>
		);
	})
);

FrameMenuReminder.propTypes = {
	iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	bgcolor: PropTypes.string,
	severity: PropTypes.string,
	dense: PropTypes.bool
};

FrameMenuReminder.displayName = "FrameMenuReminder";
