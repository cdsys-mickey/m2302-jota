import A15GridContainer from "@/components/jobs/A15/A15GridContainer";
import A15Toolbar from "@/components/jobs/A15/A15Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A15Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A15Toolbar />
				<A15GridContainer />
			</Box>
		</FrameBox>
	);
});

A15Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A15Frame.displayName = "A15Frame";
export default A15Frame;
