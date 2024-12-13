import P16GridContainer from "@/components/jobs/P16/P16GridContainer";
import P16Toolbar from "@/components/jobs/P16/P16Toolbar";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const P16Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<Box>
				<P16Toolbar />
				<P16GridContainer />
			</Box>
		</Box>
	);
});

P16Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

P16Frame.displayName = "P16Frame";
export default P16Frame;

