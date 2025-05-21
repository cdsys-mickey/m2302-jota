import A13GridContainer from "@/components/jobs/A13/A13GridContainer";
import A13Toolbar from "@/components/jobs/A13/A13Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const A13Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A13Toolbar />
				<A13GridContainer />
			</Box>
		</FrameBox>
	);
});

A13Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A13Frame.displayName = "A13Frame";
export default A13Frame;
