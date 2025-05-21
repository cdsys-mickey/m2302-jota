import A12GridContainer from "@/components/jobs/A12/A12GridContainer";
import A12Toolbar from "@/components/jobs/A12/A12Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A12Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A12Toolbar />
				<A12GridContainer />
			</Box>
		</FrameBox>
	);
});

A12Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A12Frame.displayName = "A12Frame";
export default A12Frame;
