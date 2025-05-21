import A26GridContainer from "@/components/jobs/A26/A26GridContainer";

import A26Toolbar from "@/components/jobs/A26/A26Toolbar";
import { FrameBanner, FrameBox } from "@/shared-components";
import PropTypes from "prop-types";
import { memo } from "react";

const A26Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<A26Toolbar />
			<A26GridContainer />
		</FrameBox>
	);
});

A26Frame.propTypes = {
	drawerOpen: PropTypes.bool,
};

A26Frame.displayName = "A26Frame";
export default A26Frame;
