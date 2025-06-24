import P31GridContainer from "@/modules/P31/P31GridContainer";
import P31Toolbar from "@/modules/P31/P31Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const P31Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<P31Toolbar />
				<P31GridContainer />
			</Box>
		</FrameBox>
	);
});

P31Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P31Frame.displayName = "P31Frame";
export default P31Frame;


