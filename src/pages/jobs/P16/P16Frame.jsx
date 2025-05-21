import P16GridContainer from "@/components/jobs/P16/P16GridContainer";
import P16Toolbar from "@/components/jobs/P16/P16Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const P16Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<P16Toolbar />
				<P16GridContainer />
			</Box>
		</FrameBox>
	);
});

P16Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P16Frame.displayName = "P16Frame";
export default P16Frame;

