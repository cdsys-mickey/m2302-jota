import A08GridContainer from "@/components/modules/A08/A08GridContainer";
import A08Toolbar from "@/components/modules/A08/A08Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A08Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A08Toolbar />
				<A08GridContainer />
			</Box>
		</Box>
	);
});

A08Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A08Frame.displayName = "A08Frame";
export default A08Frame;
