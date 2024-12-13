import A26GridContainer from "@/components/jobs/A26/A26GridContainer";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { Box, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import A26Toolbar from "@/components/jobs/A26/A26Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import Styles from "@/modules/md-styles";
import PropTypes from "prop-types";

const A26Frame = memo((props) => {
	const { drawerOpen, boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<A26Toolbar />
			<A26GridContainer />
		</Box>
	);
});

A26Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A26Frame.displayName = "A26Frame";
export default A26Frame;
