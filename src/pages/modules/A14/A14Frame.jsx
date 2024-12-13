import A14GridContainer from "@/components/jobs/A14/A14GridContainer";
import A14Toolbar from "@/components/jobs/A14/A14Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A14Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<A14Toolbar />
				<A14GridContainer />
			</Box>
		</Box>
	);
});

A14Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A14Frame.displayName = "A14Frame";
export default A14Frame;
