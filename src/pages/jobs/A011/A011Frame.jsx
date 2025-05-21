import { A011GridContainer } from "@/components/jobs/A011/A011GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A011Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A011GridContainer />
			</Box>
		</FrameBox>
	);
});

A011Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A011Frame.displayName = "A011Frame";
export default A011Frame;
