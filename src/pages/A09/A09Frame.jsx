import A09GridContainer from "@/components/modules/A09/A09GridContainer";
import A09Toolbar from "@/components/modules/A09/A09Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A09Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A09Toolbar />
				<A09GridContainer />
			</Box>
		</Box>
	);
});

A09Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A09Frame.displayName = "A09Frame";
export default A09Frame;
