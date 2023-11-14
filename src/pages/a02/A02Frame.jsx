import A02GridContainer from "@/components/modules/a02/A02GridContainer";
import { Box, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import A02Toolbar from "@/components/modules/a02/A02Toolbar";
import Styles from "@/modules/md-styles";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import PropTypes from "prop-types";

const A02Frame = memo((props) => {
	const { drawerOpen } = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);
	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A02Toolbar />
				<A02GridContainer />
			</Box>
		</Box>
	);
});

A02Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A02Frame.displayName = "A02Frame";
export default A02Frame;
