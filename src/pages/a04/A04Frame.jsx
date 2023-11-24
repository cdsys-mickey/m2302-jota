import { Box } from "@mui/material";
import { memo } from "react";
import A04GridContainer from "@/components/modules/a04/A04GridContainer";
import A04Toolbar from "@/components/modules/a04/A04Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import PropTypes from "prop-types";

const A04Frame = memo((props) => {
	const { drawerOpen, boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<A04Toolbar />
			<A04GridContainer />
		</Box>
	);
});

A04Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A04Frame.displayName = "A04Frame";
export default A04Frame;
