import A02GridContainer from "@/components/jobs/A02/A02GridContainer";
import A02Toolbar from "@/components/jobs/A02/A02Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A02Frame = memo((props) => {
	const { boxStyles } = props;

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
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A02Frame.displayName = "A02Frame";
export default A02Frame;
