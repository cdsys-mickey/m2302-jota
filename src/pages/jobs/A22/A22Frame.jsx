import { A22GridContainer } from "@/components/jobs/A22/A22GridContainer";
import { A22GridFormContainer } from "@/components/jobs/A22/A22GridFormContainer";
import { A22GridToolbarFormContainer } from "@/components/jobs/A22/A22GridToolbarFormContainer";
import { FrameBanner, FrameBox } from "@/shared-components";
import ContainerEx from "@/shared-components/ContainerEx";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";

const A22Frame = memo(() => {

	return (
		<FrameBox>
			<FrameBanner />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<A22GridFormContainer />
				</Box>
			</ContainerEx>
			<Box>
				<A22GridToolbarFormContainer />
				<A22GridContainer />
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
