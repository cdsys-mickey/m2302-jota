import A26GridContainer from "@/components/modules/a26/A26GridContainer";
import FrameBanner from "@/shared-components/protected-page/FrameBanner";
import { Box } from "@mui/material";
import { memo } from "react";
import A26Toolbar from "../../components/modules/a26/A26Toolbar";
import { FrameBannerContainer } from "../../shared-components/protected-page/FrameBannerContainer";

const A26Frame = memo(() => {
	return (
		<Box pt={1}>
			<FrameBannerContainer />
			<A26Toolbar />
			<A26GridContainer />
		</Box>
	);
});

A26Frame.propTypes = {};

A26Frame.displayName = "A26Frame";
export default A26Frame;
