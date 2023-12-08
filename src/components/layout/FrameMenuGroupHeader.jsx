import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import Colors from "@/modules/md-colors";

export const FrameMenuGroupHeader = memo(
	forwardRef((props, ref) => {
		const { iconComponent, text, variant = "h6", sx = [], ...rest } = props;
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
						bgcolor: "primary.main",
						height: "34px",
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<FlexBox>{Icon && <Icon htmlColor="#fff" />}</FlexBox>

				<Typography
					variant={variant}
					color="primary.contrastText"
					sx={{
						fontWeight: 700,
						fontSize: 18,
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
};

FrameMenuGroupHeader.displayName = "FrameMenuGroupHeader";
