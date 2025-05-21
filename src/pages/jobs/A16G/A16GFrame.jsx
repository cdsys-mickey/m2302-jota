import A16GGridContainer from "@/components/jobs/A16G/A16GGridContainer";
import A16GToolbar from "@/components/jobs/A16G/A16GToolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A16GFrame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A16GToolbar />
				<A16GGridContainer />
			</Box>
		</FrameBox>
	);
});

A16GFrame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.object,
};

A16GFrame.displayName = "A16GFrame";
export default A16GFrame;
