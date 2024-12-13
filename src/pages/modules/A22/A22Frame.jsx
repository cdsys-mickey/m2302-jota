import { A22GridContainer } from "@/components/jobs/A22/A22GridContainer";
import { A22GridFormContainer } from "@/components/jobs/A22/A22GridFormContainer";
import ContainerEx from "@/shared-components/ContainerEx";
import { FrameBannerContainer } from "@/shared-components/protected-page/FrameBannerContainer";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { memo } from "react";
import { A22GridToolbarFormContainer } from "../../../components/jobs/A22/A22GridToolbarFormContainer";

const A22Frame = memo((props) => {
	const { boxStyles } = props;

	return (
		<Box sx={[boxStyles]}>
			<FrameBannerContainer />
			<ContainerEx maxWidth="md" alignLeft>
				<Box>
					<A22GridFormContainer />
				</Box>
			</ContainerEx>
			<Box>
				<A22GridToolbarFormContainer />
				<A22GridContainer />
			</Box>
		</Box>
	);
});

A22Frame.propTypes = {
	drawerOpen: PropTypes.bool,
	boxStyles: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

A22Frame.displayName = "A22Frame";
export default A22Frame;
