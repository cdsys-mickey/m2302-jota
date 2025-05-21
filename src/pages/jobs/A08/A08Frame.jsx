import A08GridContainer from "@/components/jobs/A08/A08GridContainer";
import A08Toolbar from "@/components/jobs/A08/A08Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A08Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A08Toolbar />
				<A08GridContainer />
			</Box>
		</FrameBox>
	);
});

A08Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A08Frame.displayName = "A08Frame";
export default A08Frame;
