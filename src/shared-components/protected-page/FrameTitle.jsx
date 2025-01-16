import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { FrameMenuButton } from "./FrameMenuButton";
import FlexBox from "../FlexBox";

const FrameTitle = memo(
	forwardRef((props, ref) => {
		const { mobile, onClick, drawerOpen, children, ...rest } = props;

		return (
			<FlexBox
				inline
				alignItems="center"
				justifyContent="flex-start"
				{...(!mobile && { ml: -3 })}>
				{!mobile && (
					<FrameMenuButton onClick={onClick} drawerOpen={drawerOpen} />
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
