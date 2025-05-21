import A04GridContainer from "@/components/jobs/A04/A04GridContainer";
import A04Toolbar from "@/components/jobs/A04/A04Toolbar";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const A04Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<A04Toolbar />
			<A04GridContainer />
		</FrameBox>
	);
});

A04Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A04Frame.displayName = "A04Frame";
export default A04Frame;
