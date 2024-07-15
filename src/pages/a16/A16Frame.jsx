import A16GridContainer from "@/components/jobs/A16/A16GridContainer";
import { Box, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import A16Toolbar from "@/components/jobs/A16/A16Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import PropTypes from "prop-types";

const A16Frame = memo((props) => {
	const { drawerOpen, boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A16Toolbar />
				<A16GridContainer />
			</Box>
		</Box>
	);
});

A16Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A16Frame.displayName = "A16Frame";
export default A16Frame;
