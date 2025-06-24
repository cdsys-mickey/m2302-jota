import P32GridContainer from "@/modules/P32/P32GridContainer";
import P32Toolbar from "@/modules/P32/P32Toolbar";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const P32Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<Box>
				<P32Toolbar />
				<P32GridContainer />
			</Box>
		</FrameBox>
	);
});

P32Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P32Frame.displayName = "P32Frame";
export default P32Frame;



