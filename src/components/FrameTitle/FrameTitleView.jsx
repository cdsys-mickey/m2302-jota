import { FrameMenuButton } from "@/shared-components";
import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { forwardRef, memo } from "react";

const FrameTitleView = memo(
	forwardRef((props, ref) => {
		const { children, drawerOpen, mobile, ...rest } = props;

		const showMenuButton = useMemo(() => {
			return !drawerOpen
		}, [drawerOpen])

		return (
			<FlexBox
				inline
				alignItems="center"
				justifyContent="flex-start"
				{...(showMenuButton && { ml: -3 })}>
				{showMenuButton && (
					<FrameMenuButton />
				)}
				<Typography ref={ref} variant="h5" {...rest}>
					{children}
				</Typography>
			</FlexBox>
		);
	})
);
FrameTitleView.propTypes = {
	mobile: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
	drawerOpen: PropTypes.bool,
	onClick: PropTypes.func
}
FrameTitleView.displayName = "FrameTitleView";
export default FrameTitleView;
