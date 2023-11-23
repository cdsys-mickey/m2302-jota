import A26GridContainer from "@/components/modules/a26/A26GridContainer";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { Box, useTheme } from "@mui/material";
import { memo, useMemo } from "react";
import A26Toolbar from "@/components/modules/a26/A26Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import Styles from "@/modules/md-styles";

const A26Frame = memo((props) => {
	const { drawerOpen } = props;
	const theme = useTheme();
	const boxStyles = useMemo(
		() => Styles.ofFrameBox({ theme, drawerOpen }),
		[drawerOpen, theme]
	);
	return (
		<Box pt={1}>
			<FrameBannerContainer />
			<Box sx={[boxStyles]}>
				<A26Toolbar />
				<A26GridContainer />
			</Box>
		</Box>
	);
});

A26Frame.propTypes = {};

A26Frame.displayName = "A26Frame";
export default A26Frame;
