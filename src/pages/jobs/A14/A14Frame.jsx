import A14GridContainer from "@/components/jobs/A14/A14GridContainer";
import A14Toolbar from "@/components/jobs/A14/A14Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A14Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A14Toolbar />
				<A14GridContainer />
			</Box>
		</FrameBox>
	);
});

A14Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A14Frame.displayName = "A14Frame";
export default A14Frame;
