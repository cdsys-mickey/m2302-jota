import A12GridContainer from "@/components/modules/A12/A12GridContainer";
import A12Toolbar from "@/components/modules/A12/A12Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A12Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A12Toolbar />
				<A12GridContainer />
			</Box>
		</Box>
	);
});

A12Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A12Frame.displayName = "A12Frame";
export default A12Frame;
