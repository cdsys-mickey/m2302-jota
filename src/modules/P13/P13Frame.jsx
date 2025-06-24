import P13GridContainer from "@/modules/P13/P13GridContainer";
import P13Toolbar from "@/modules/P13/P13Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const P13Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<P13Toolbar />
				<P13GridContainer />
			</Box>
		</FrameBox>
	);
});

P13Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P13Frame.displayName = "P13Frame";
export default P13Frame;

