import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

const FrameTitle = memo(
	forwardRef((props, ref) => {
		const { children, ...rest } = props;

		return (
			<Typography ref={ref} variant="h5" {...rest}>
				{children}
			</Typography>
		);
	})
);
FrameTitle.propTypes = {
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}
FrameTitle.displayName = "FrameTitle";
export default FrameTitle;
