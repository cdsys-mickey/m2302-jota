import A16GGridContainer from "@/components/jobs/A16G/A16GGridContainer";
import A16GToolbar from "@/components/jobs/A16G/A16GToolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A16GFrame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A16GToolbar />
				<A16GGridContainer />
			</Box>
		</Box>
	);
});

A16GFrame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.object,
};

A16GFrame.displayName = "A16GFrame";
export default A16GFrame;
