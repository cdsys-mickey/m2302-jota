import A09GridContainer from "@/components/jobs/A09/A09GridContainer";
import A09Toolbar from "@/components/jobs/A09/A09Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A09Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A09Toolbar />
				<A09GridContainer />
			</Box>
		</FrameBox>
	);
});

A09Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A09Frame.displayName = "A09Frame";
export default A09Frame;
