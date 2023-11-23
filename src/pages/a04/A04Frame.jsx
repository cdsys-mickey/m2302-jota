import { Box } from "@mui/material";
import { memo } from "react";
import A04GridContainer from "@/components/modules/a04/A04GridContainer";
import A04Toolbar from "@/components/modules/a04/A04Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";

const A04Frame = memo(() => {
	return (
		<Box pt={1}>
			<FrameBannerContainer />
			<A04Toolbar />
			<A04GridContainer />
		</Box>
	);
});

A04Frame.propTypes = {};

A04Frame.displayName = "A04Frame";
export default A04Frame;
