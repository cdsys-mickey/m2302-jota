import A15GridContainer from "@/components/jobs/A15/A15GridContainer";
import A15Toolbar from "@/components/jobs/A15/A15Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A15Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A15Toolbar />
				<A15GridContainer />
			</Box>
		</Box>
	);
});

A15Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A15Frame.displayName = "A15Frame";
export default A15Frame;
