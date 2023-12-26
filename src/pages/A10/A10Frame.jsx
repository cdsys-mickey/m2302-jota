import A10GridContainer from "@/components/modules/A10/A10GridContainer";
import A10Toolbar from "@/components/modules/A10/A10Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A10Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A10Toolbar />
				<A10GridContainer />
			</Box>
		</Box>
	);
});

A10Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A10Frame.displayName = "A10Frame";
export default A10Frame;
