import A02GridContainer from "@/modules/A02/A02GridContainer";
import A02Toolbar from "@/modules/A02/A02Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const A02Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<A02Toolbar />
				<A02GridContainer />
			</Box>
		</FrameBox>
	);
});

A02Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A02Frame.displayName = "A02Frame";
export default A02Frame;
