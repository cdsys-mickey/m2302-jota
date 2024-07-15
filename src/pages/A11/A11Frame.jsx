import A11GridContainer from "@/components/jobs/A11/A11GridContainer";
import A11Toolbar from "@/components/jobs/A11/A11Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A11Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A11Toolbar />
				<A11GridContainer />
			</Box>
		</Box>
	);
});

A11Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A11Frame.displayName = "A11Frame";
export default A11Frame;
