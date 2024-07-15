import A13GridContainer from "@/components/jobs/A13/A13GridContainer";
import A13Toolbar from "@/components/jobs/A13/A13Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A13Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A13Toolbar />
				<A13GridContainer />
			</Box>
		</Box>
	);
});

A13Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A13Frame.displayName = "A13Frame";
export default A13Frame;
