import MuiStyles from "@/shared-modules/MuiStyles";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { AlertEx, FlexBox } from "shared-components";

export const FrameMenuReminderItem = memo(
	forwardRef((props, ref) => {
		const {
			title,
			label,
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
				pt={1.5}
				pb={1}
				pl={2}

				sx={[
					{
						height: "60px",
					},
					...(Array.isArray(sx) ? sx : [sx]),
					MuiStyles.ELLIPSIS,
				]}
				{...rest}>
				<AlertEx severity={severity} title={title} transparent >
					{label}
				</AlertEx>

			</FlexBox>
		);
	})
);

FrameMenuReminderItem.propTypes = {
	iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	title: PropTypes.string,
	label: PropTypes.string.isRequired,
	variant: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	bgcolor: PropTypes.string,
	severity: PropTypes.string,
	dense: PropTypes.bool
};

FrameMenuReminderItem.displayName = "FrameMenuReminder";
