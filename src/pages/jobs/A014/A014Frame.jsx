import { A014GridContainer } from "@/components/jobs/A014/A014GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const A014Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer />
				</Box>
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A014GridContainer />
			</Box>
		</FrameBox>
	);
});

A014Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A014Frame.displayName = "A014Frame";
export default A014Frame;
