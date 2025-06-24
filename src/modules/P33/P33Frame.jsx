import P33GridContainer from "@/modules/P33/P33GridContainer";
import P33Toolbar from "@/modules/P33/P33Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const P33Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<P33Toolbar />
				<P33GridContainer />
			</Box>
		</FrameBox>
	);
});

P33Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P33Frame.displayName = "P33Frame";
export default P33Frame;




