import FlexBox from "@/shared-components/FlexBox";
import { Typography } from "@mui/material";
import { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import Colors from "@/modules/colors";

export const FrameMenuGroupHeader = memo(
	forwardRef((props, ref) => {
		const { Icon, text, variant = "h6", sx = [], ...rest } = props;
		return (
			<FlexBox
				ref={ref}
				inline
				fullWidth
				pt="2px"
				pl={0.5}
				sx={[
					{
						bgcolor: "primary.main",
						height: "36px",
					},
					...(Array.isArray(sx) ? sx : [sx]),
				]}
				{...rest}>
				<FlexBox alignItems="center">
					{Icon && <Icon htmlColor="#fff" />}
				</FlexBox>

				<Typography
					variant={variant}
					color="primary.contrastText"
					sx={{
						fontWeight: 700,
					}}>
					{text}
				</Typography>
			</FlexBox>
		);
	})
);

FrameMenuGroupHeader.propTypes = {
	Icon: PropTypes.object,
	text: PropTypes.string.isRequired,
	variant: PropTypes.string,
	sx: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

FrameMenuGroupHeader.displayName = "FrameMenuGroupHeader";
