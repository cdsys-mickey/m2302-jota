import A10GridContainer from "@/components/jobs/A10/A10GridContainer";
import A10Toolbar from "@/components/jobs/A10/A10Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A10Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A10Toolbar />
				<A10GridContainer />
			</Box>
		</FrameBox>
	);
});

A10Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A10Frame.displayName = "A10Frame";
export default A10Frame;
