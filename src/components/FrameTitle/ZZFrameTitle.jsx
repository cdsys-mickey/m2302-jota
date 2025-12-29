import { FrameMenuButton } from "@/shared-components";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";
import { FlexBox } from "shared-components";

const ZZFrameTitle = memo(
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
ZZFrameTitle.propTypes = {
	mobile: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	drawerOpen: PropTypes.bool,
	onClick: PropTypes.func
}
ZZFrameTitle.displayName = "ZZFrameTitle";
export default ZZFrameTitle;
