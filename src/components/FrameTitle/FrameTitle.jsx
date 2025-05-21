import { FrameMenuButton } from "@/shared-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import FlexBox from "../../shared-components/FlexBox";

const FrameTitle = memo(
	forwardRef((props, ref) => {
		const { mobile, children, ...rest } = props;

		return (
			<FlexBox
				inline
				alignItems="center"
				justifyContent="flex-start"
				{...(!mobile && { ml: -3 })}>
				{!mobile && (
					<FrameMenuButton />
				)}
				<Typography ref={ref} variant="h5" {...rest}>
					{children}
				</Typography>
			</FlexBox>
		);
	})
);
FrameTitle.propTypes = {
	mobile: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	drawerOpen: PropTypes.bool,
	onClick: PropTypes.func
}
FrameTitle.displayName = "FrameTitle";
export default FrameTitle;
