import { FlexBox } from "@/shared-components";
import MuiStyles from "@/shared-modules/MuiStyles";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, memo } from "react";

export const FrameMenuGroupHeader = memo(
	forwardRef((props, ref) => {
		const {
			iconComponent,
			text,
			variant = "h6",
			bgcolor = "primary.main",
			dense = false,
			sx = [],
			...rest
		} = props;
		const Icon = iconComponent;
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
						bgcolor,
						height: dense ? "26px" : "34px",
					},
					...(Array.isArray(sx) ? sx : [sx]),
					MuiStyles.ELLIPSIS,
				]}
				{...rest}>
				<FlexBox>{iconComponent && <Icon htmlColor="#fff" fontSize={dense ? "small" : "medium"} />}</FlexBox>

				<Typography
					variant={variant}
					color="primary.contrastText"
					sx={{
						fontWeight: 500,
						fontSize: dense ? 17 : 20,
					}}>
					{text}
				</Typography>
			</FlexBox>
		);
	})
);

FrameMenuGroupHeader.propTypes = {
	iconComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.elementType]),
	text: PropTypes.string.isRequired,
	variant: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	bgcolor: PropTypes.string,
};

FrameMenuGroupHeader.displayName = "FrameMenuGroupHeader";
