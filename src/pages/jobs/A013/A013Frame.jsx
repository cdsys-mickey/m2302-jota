import { A013GridContainer } from "@/components/jobs/A013/A013GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import { FrameBanner, FrameBox } from "@/shared-components";

const A22Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<ProdGridFormContainer />
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A013GridContainer />
			</Box>
		</FrameBox>
	);
});

A22Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A22Frame.displayName = "A22Frame";
export default A22Frame;
