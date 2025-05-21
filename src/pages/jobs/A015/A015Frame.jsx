import { A015GridContainer } from "@/components/jobs/A015/A015GridContainer";
import { ProdGridFormContainer } from "@/components/jobs/prod-grid/ProdGridFormContainer";
import { ProdGridToolbarContainer } from "@/components/jobs/prod-grid/ProdGridToolbarContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { FrameBanner, FrameBox } from "@/shared-components";

const A015Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<ProdGridFormContainer safeQty />
				</Box>
			</ContainerEx>
			<Box>
				<ProdGridToolbarContainer />
				<A015GridContainer />
			</Box>
		</FrameBox>
	);
});

A015Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A015Frame.displayName = "A015Frame";
export default A015Frame;
